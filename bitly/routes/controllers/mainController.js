import * as linkService from "../../services/linkService.js";

const showMain = ({ render }) => {
    render("main.eta",{link:""});
  };
const getLinkData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
      link: params.get("link"),
    };
  };  
const createLink = async ({ request, render }) => {
    const linkData = await getLinkData(request);
    const shortLink = `http://localhost:7777/${Math.random().toString(36).slice(2, 8)}`
    await linkService.createLink(
        linkData.link,shortLink
      );
  render("main.eta",{shortLink});
}

const redirect = async ({ response,request }) => {
  const link =  await linkService.getLinkByShort(
    `http://localhost:7777${request.url.pathname}`
  );
  if (link)  response.redirect("//"+link.replace("https://","").replace("http://",""))
  else response.redirect("http://localhost:7777/")
}

const getRandom =async ({ response,render})=>{
    const links = await linkService.getLinks()
    if (links.length==0){
      return render("main.eta",{noLinks:true})
    }
    links.sort(()=>Math.random()-0.5)
    return response.redirect("//"+links[0].link.replace("https://","").replace("http://",""))
  }
  export { showMain, createLink, redirect, getRandom};