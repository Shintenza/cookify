import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
};
