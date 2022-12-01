import * as linkService from "../services/linkService.js";

const showMain = (req, res)  => {
    res.render("main.eta",{link:""});
  };

const createLink = async (req, res) => {
    const shortLink = `http://localhost:8000/${Math.random().toString(36).slice(2, 8)}`
    await linkService.createLink(
        req.body.link,shortLink
      );
      res.render("main.eta",{shortLink});
}

const redirect = async (req, res) => {
  const link =  await linkService.getLinkByShort(
    `http://localhost:8000${req.path}`
    );
  if (link)  res.redirect("//"+link.replace("https://","").replace("http://",""))
  else res.redirect("http://localhost:8000/")
}
const getRandom =async (req, res)=>{
    const links = await linkService.getLinks()
    if (links.length==0){
      return res.render("main.eta",{noLinks:true})
    }
    links.sort(()=>Math.random()-0.5)
    return res.redirect("//"+links[0].link.replace("https://","").replace("http://",""))
  }
  export { showMain, createLink, redirect, getRandom}