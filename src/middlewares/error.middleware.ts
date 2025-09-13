import { NextFunction, Request, Response } from "express-serve-static-core";
import { ZodError } from "zod";
import { ErrorObject } from "../types/errors";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";

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

    // all database error
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        // Duplicate key error
        const field = Object.keys(err.keyValue)[0];
        error.statusCode = 409;
        error.message = `${field} is already taken`;
      } else if (err instanceof mongoose.Error.CastError) {
        // cast error
        error.statusCode = 404;
        error.message = "resources not found";
      } else if (err instanceof mongoose.Error.ValidationError) {
        // validation error
        const messages = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        error.statusCode = 400;
        error.message = messages;
      } else {
        // databse error
        error.statusCode = 400;
        error.message = "uncaught database error";
      }
    }
    // we will add more errors type here...

    response.status(error.statusCode).send(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
