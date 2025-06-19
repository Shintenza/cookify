import { Router, json } from "express";
import { postLogin } from "../../controllers/api/auth";
import cookieParser from "cookie-parser";
import {
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  postRecipe,
} from "../../controllers/api/recipe";
import { checkJwt, isAdmin } from "../../middleware/api/verifyJwt";
import upload from "../../config/storage";

const router = Router();

router.use(json());
router.use(cookieParser());

router.post("/login", postLogin);

router.get("/recipes", getAllRecipes);
router.post("/recipes", upload.single("image"), checkJwt, postRecipe);
router.get("/recipes/:id", getRecipe);
router.delete("/recipes/:id", checkJwt, isAdmin, deleteRecipe);

export default router;
