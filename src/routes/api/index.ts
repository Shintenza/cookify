import { Router, json } from "express";
import { postLogin } from "../../controllers/api/auth";
import recipesRoutes from "./recipe";
import authRoutes from "./auth";
import cookieParser from "cookie-parser";

const router = Router();

router.use(json());
router.use(cookieParser());

router.use("/auth", authRoutes);
router.use("/recipes", recipesRoutes);

export default router;
