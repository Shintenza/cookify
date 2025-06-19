import { Request, Response, NextFunction } from "express";
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
