import { Request, Response, NextFunction } from "express-serve-static-core";
import { UserRole } from "../types/user-role.enum";
import { APIError } from "../helpers/error";
import { StatusCode } from "../types/status-code.enum";

const roleMiddleware =
  (role: UserRole = UserRole.Admin) =>
  async (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      return;
    }
    // now we have user
    if (request.user.role !== role) {
      throw new APIError(
        StatusCode.FORBIDDEN,
        "you don't have permission for this action"
      );
    }
    next();
  };

export default roleMiddleware;
