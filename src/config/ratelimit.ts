import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express-serve-static-core";
import { ErrorObject } from "../types/error.type";
import { StatusCodes } from "../types/statusCodes";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 100, // number of req per windowMs
  standardHeaders: "draft-8",
  legacyHeaders: false,

  handler: (request: Request, response: Response<ErrorObject>) => {
    const error: ErrorObject = {
      success: false,
      statusCode: StatusCodes.RATELIMIT,
      message: "Too many requests, please try again later.",
    };
    response.status(error.statusCode).send(error);
  },
});

export default limiter;
