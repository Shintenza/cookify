import { Response, Request } from "express";

export const renderHome = (req: Request, res: Response) => {
  res.render("home/index");
};
