import { Router } from "express";
import {
  handleRecipeCreation,
  renderRecipeForm,
  renderRecipe,
  handlePostComment,
  renderSearch,
} from "../controllers/recipe";
import upload from "../config/storage";

const router = Router();

router.get("/search", renderSearch);
router.get("/create", renderRecipeForm);
router.post("/:id/comments", handlePostComment);
router.get("/:id", renderRecipe);
router.post("/", upload.single("image"), handleRecipeCreation);

export default router;
