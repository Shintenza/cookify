import { Request, Response } from "express";
import { LoginData, RegisterData } from "./types";
import { loginUser, registerUser } from "../services/auth";
import { UserExists } from "../services/errors";

export const renderLogin = (req: Request, res: Response) => {
  res.render("auth/login");
};

export const renderRegister = (req: Request, res: Response) => {
  res.render("auth/register");
};

export const handleRegister = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body as RegisterData;

  try {
    const createdUser = await registerUser({ email, password, fullName });
    req.session.user = {
      fullName: createdUser.fullName,
      email: createdUser.email,
      role: createdUser.role,
    };
    res.redirect("/");
  } catch (e) {
    if (e instanceof UserExists) {
      res.render("auth/register", {
        errors: {
          email: "An account with this email already exists!",
        },
      });
    }
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginData;

  try {
    const user = await loginUser({ email, password });
    req.session.user = {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
    res.redirect("/");
  } catch (e) {
    res.render("auth/login", {
      error: "Invalid email or password",
    });
  }
};

export const handleLogout = (req: Request, res: Response) => {
  req.session.user = null;
  res.redirect("/");
};
