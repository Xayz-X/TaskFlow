// validateRequest.ts
import { z } from "zod";
import { Request, Response, NextFunction } from "express-serve-static-core";

const requestValidatorMiddleware =
  (schema: z.ZodObject) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body = schema.parse(request.body);
      next();
    } catch (err) {
      next(err);
    }
  };

export default requestValidatorMiddleware;
