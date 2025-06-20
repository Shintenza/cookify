import { Router } from "express";
import {
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  postRecipe,
} from "../../controllers/api/recipe";
import upload from "../../config/storage";
import { checkJwt, isAdmin } from "../../middleware/api/verifyJwt";

const router = Router();

router.get("/", getAllRecipes);
router.post("/", upload.single("image"), checkJwt, postRecipe);
router.get("/:id", getRecipe);
router.delete("/:id", checkJwt, isAdmin, deleteRecipe);

export default router;
