import { Request, Response, NextFunction } from "express";
import config from "../config/config";
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }
  next();
};

export const passQueryToLocals = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.query = req.query;
  next();
};

export const passPrefixToLocals = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.prefix = config.prefix === "/" ? "/" : `/${config.prefix}/`;
  next();
};
