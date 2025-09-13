// validateRequest.ts
import { z } from "zod";
import { Request, Response, NextFunction } from "express-serve-static-core";

export const validateRequest =
  (schema: z.ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
