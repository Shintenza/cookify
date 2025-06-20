import { Router } from "express";
import { postLogin, postRegister } from "../../controllers/api/auth";
import { validateBody } from "../../middleware/api/validateBody";
import { loginSchema, registerSchema } from "../../controllers/api/schema";

const router = Router();
router.post("/login", validateBody(loginSchema), postLogin);
router.post("/register", validateBody(registerSchema), postRegister);

export default router;
