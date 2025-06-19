import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../../types/user";
import config from "../../config/config";

export const checkJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authToken = req.cookies.token;

  if (!authToken) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = jwt.verify(authToken, config.jwtSecret) as UserPayload;
    req.user = payload;
    return next();
  } catch {
    return res.sendStatus(401);
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  if (req.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  return next();
};
