import { Router } from "express";
import { renderHome } from "../controllers/home";

const router = Router();

router.get("/", renderHome);

export default router;
