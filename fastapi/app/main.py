from typing import Union

from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from pathlib import Path
from pydantic import BaseModel
import random
import string
import sqlalchemy
import databases
import os

 
DATABASE_URL=os.getenv("DATABASE_URL")
database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

links = sqlalchemy.Table(
    "link",
    metadata,
    sqlalchemy.Column("shortlink", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("link", sqlalchemy.String),
)
engine = sqlalchemy.create_engine(
   DATABASE_URL, pool_size=2
)

metadata.create_all(engine)
class Link(BaseModel):
    shortlink: str
    link: str

app = FastAPI()

BASE_PATH = Path(__file__).resolve().parent
print(BASE_PATH)
templates = Jinja2Templates(directory=str(BASE_PATH / "templates"))

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
    
@app.get("/", response_class=HTMLResponse)
async def get_main_page(request: Request):
    return templates.TemplateResponse("main.html", {"request":request})

@app.post("/", response_class=HTMLResponse)
async def add_link(request:Request,link: str = Form()):
    shortlink = f"http://localhost:5000/{''.join(random.SystemRandom().choice(string.ascii_uppercase +string.ascii_lowercase+ string.digits) for _ in range(6))}"
    query = links.insert().values(shortlink=shortlink, link=link)
    await database.execute(query)
    return templates.TemplateResponse("main.html", {"request":request,"shortlink":shortlink})

@app.get("/random")
async def get_random(request:Request):
    query = links.select()
    all_links = await database.fetch_all(query)
    if len(all_links)==0:
        return templates.TemplateResponse("main.html", {"request":request,"no_links":True})
    addresses=[]
    for link in all_links:
        addresses.append(tuple(link.values())[1])
    random.shuffle(addresses)
    return RedirectResponse(f"//{addresses[0].replace('https://','').replace('http://','')}")

@app.get("/{short}")
async def redirect(short: str,request:Request):
    query = links.select()
    all_links = await database.fetch_all(query)
    for link in all_links:
        values = tuple(link.values())
        if values[0]== f"http://localhost:5000/{short}":
            return RedirectResponse(f"//{values[1].replace('https://','').replace('http://','')}")
    return RedirectResponse("http://localhost:5000/")