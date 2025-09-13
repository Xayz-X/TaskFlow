import { NextFunction, Request, Response } from "express-serve-static-core";
import { z, ZodError } from "zod";
import { ErrorObject } from "../types/errors";

const errorMiddleware = async (
  err: unknown,
  request: Request,
  response: Response<ErrorObject>,
  next: NextFunction
) => {
  try {
    const error: ErrorObject = {
      success: false,
      statusCode: 500,
      message: `Something went wrong please try again later.`,
    };

    if (err instanceof ZodError) {
      const messages = err.issues
        .map((issue) => `${issue.message} -> ${issue.path.join(", ")}`)
        .join("; ");
      error.statusCode = 400;
      error.message = messages;
    }

    // we will add more errors type here...

    response.status(error.statusCode).send(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
