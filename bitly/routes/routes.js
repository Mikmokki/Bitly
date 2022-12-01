import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";

const router = new Router();

router.get("/", mainController.showMain);
router.post("/", mainController.createLink);
router.get("/random",mainController.getRandom)
router.get("/:short",mainController.redirect)

export { router };