import express from "express"
const app = express()
import { renderFile } from "eta"
import * as mainController from "./controllers/mainController.js";
app.use(express.json()) 
app.use(express.urlencoded({
  extended: true
}))
app.engine("eta", renderFile)

app.set("view engine", "eta")

app.set("views", "./views")

app.get("/", mainController.showMain);
app.post("/",mainController.createLink)
app.get("/random",mainController.getRandom)
app.get("/:short",mainController.redirect)


app.listen(8000, function () {
  console.log("listening to requests on port 8000")
})  