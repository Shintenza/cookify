import { Router } from "express";
import { handleRecipeCreation, renderRecipeForm } from "../controllers/recipe";
import upload from "../config/storage";

const router = Router();

router.get("/create", renderRecipeForm);
router.post("/", upload.single("image"), handleRecipeCreation);

export default router;
