import { ZodError } from "zod";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { JsonWebTokenError } from "jsonwebtoken";
import { ErrorObject } from "../types/error.type";
import { APIError } from "../helpers/error";
import { StatusCode } from "../types/status-code.enum";

const errorMiddleware = async (
  err: unknown,
  request: Request,
  response: Response<ErrorObject>,
  next: NextFunction
) => {
  try {
    // if any error does nto match finally it will raise defualt error of 500
    // with a generic message
    const error: ErrorObject = {
      success: false,
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      message: `Something went wrong please try again later.`,
    };

    // this is custom error class
    if (err instanceof APIError) {
      error.statusCode = err.statusCode;
      error.message = err.message;
    } else if (err instanceof JsonWebTokenError) {
      error.statusCode = 401;
      error.message = "invalid authorization token";
    } else if (err instanceof ZodError) {
      const messages = err.issues
        .map((issue) => `${issue.message} -> ${issue.path.join(", ")}`)
        .join("; ");
      error.statusCode = StatusCode.BAD_REQUEST;
      error.message = messages;
    } else if (
      err instanceof mongoose.Error &&
      err.cause instanceof MongoServerError
    ) {
      // Handle duplicate key through the cause
      if (err.cause.code === 11000) {
        const field = Object.keys(err.cause.keyValue)[0];
        error.statusCode = StatusCode.CONFLICT;
        error.message = `${field} is already taken`;
      }
    } else if (err instanceof MongoServerError && err.code === 11000) {
      // Handle raw MongoServerError (first attempt)
      const field = Object.keys(err.keyValue)[0];
      error.statusCode = StatusCode.CONFLICT;
      error.message = `${field} is already taken`;
    } else if (err instanceof mongoose.Error.CastError) {
      // Mongoose-specific errors
      error.statusCode = StatusCode.NOT_FOUND;
      error.message = "Resource not found";
    } else if (err instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      error.statusCode = StatusCode.BAD_REQUEST;
      error.message = messages;
    }

    // we will add more errors type here...
    // console.log(err);
    response.status(error.statusCode).send(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
