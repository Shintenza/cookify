import { Router } from "express";
import {
  handleLogin,
  handleLogout,
  handleRegister,
  renderLogin,
  renderRegister,
} from "../controllers/auth";

const router = Router();

router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

export default router;
