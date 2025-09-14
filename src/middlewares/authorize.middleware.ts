import { Request, Response, NextFunction } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import { APIError } from "../helpers/error";
import { StatusCode } from "../types/status-code.enum";
import { JWT_SECRET } from "../config/env";
import UserModel from "../models/user.model";
import { AuthenticateJwtPayload } from "../types/jwt.types";

const authorizeMiddleware =
  (skipJwtExpiration: boolean = false) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let token: string | undefined;
      if (!request.headers.authorization) {
        throw new APIError(
          StatusCode.FORBIDDEN,
          "authorization key is missing in the header"
        );
      }
      token = request.headers.authorization.split(" ")[1];
      if (!token) {
        throw new APIError(
          StatusCode.FORBIDDEN,
          "authorization key is missing in the header"
        );
      }
      // now we have JWT token
      // 1. Verify the token
      // 2. Query the database
      const payload = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: skipJwtExpiration,
      }) as AuthenticateJwtPayload;
      const userData = await UserModel.findById(payload.userId);
      if (!userData) {
        throw new APIError(
          StatusCode.FORBIDDEN,
          "user does not exist, authentication failed"
        );
      }
      request.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  };
export default authorizeMiddleware;
