import { Router } from "express";
import { renderHome, renderLogin } from "../controllers/home";

const router = Router();

router.get("/", renderHome);
router.get("/login", renderLogin);

export default router;
