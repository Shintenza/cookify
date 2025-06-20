import { Response } from "express";
import config from "../config/config";
export const strToNum = (strNum?: string): number | undefined => {
  if (!strNum) return undefined;
  const parsedNum = parseInt(strNum);
  return !isNaN(parsedNum) ? parsedNum : undefined;
};

export const redirectWithPrefix = (res: Response, to: string) => {
  const destination = config.prefix === "/" ? to : `/${config.prefix}/${to}`;
  res.redirect(destination);
};
