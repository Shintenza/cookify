import { Router } from "express";
import {
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  postComment,
  postRecipe,
} from "../../controllers/api/recipe";
import upload from "../../config/storage";
import { checkJwt, isAdmin } from "../../middleware/api/verifyJwt";
import { validateBody } from "../../middleware/api/validateBody";
import { commentSchema } from "../../controllers/api/schema";

const router = Router();

router.get("/", getAllRecipes);
router.post("/", upload.single("image"), checkJwt, postRecipe);
router.post(
  "/:id/comments",
  checkJwt,
  validateBody(commentSchema),
  postComment
);
router.get("/:id", getRecipe);
router.delete("/:id", checkJwt, isAdmin, deleteRecipe);

export default router;
