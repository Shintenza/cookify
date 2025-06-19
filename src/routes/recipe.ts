import { Router } from "express";
import {
  handleRecipeCreation,
  renderRecipeForm,
  renderRecipe,
} from "../controllers/recipe";
import upload from "../config/storage";

const router = Router();

router.get("/create", renderRecipeForm);
router.post("/", upload.single("image"), handleRecipeCreation);
router.get("/:id", renderRecipe);

export default router;
