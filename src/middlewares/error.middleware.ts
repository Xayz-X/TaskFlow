import { NextFunction, Request, Response } from "express-serve-static-core";
import { ErrorObject } from "../types/errors";
const errorMiddleware = async (
  err: Error,
  request: Request,
  response: Response<ErrorObject>,
  next: NextFunction
) => {
  try {
    const error: ErrorObject = {
      success: false,
      statusCode: 500,
      messgae: err.message || `Something went wrong please try again later.`,
    };

    // we will add more errors type here...

    response.status(error.statusCode).send(error);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
