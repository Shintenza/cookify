import { Request, Response } from "express";
import { LoginData } from "../types";
import { loginUser, registerUser } from "../../services/auth";
import { InvalidCredentials, UserExists } from "../../services/errors";
import { signJwt } from "../../utils/jwt";

export const postLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body as LoginData;

  try {
    const user = await loginUser({ email, password });
    const token = await signJwt({
      id: user.id,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 12,
    });
    return res.sendStatus(200);
  } catch (e) {
    if (e instanceof InvalidCredentials) {
      return res.sendStatus(401);
    }
    return res.sendStatus(500);
  }
};

export const postRegister = async (req: Request, res: Response) => {
  const registerData = req.body;

  try {
    await registerUser(registerData);
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof UserExists) {
      res
        .status(400)
        .json({ message: "an account with this email already exists" });
    } else {
      res.sendStatus(500);
    }
  }
};
