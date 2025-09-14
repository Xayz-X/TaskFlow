import jwt from "jsonwebtoken";
import { UserRole } from "../types/roles.type";
import parseDuration from "./datetime";
import { AuthenticateJwtPayload } from "../types/jwt.types";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/env";

const signJwtToken = (
  userId: string,
  role: UserRole
): { token: string; expiresAt: number } => {
  const expiresAt =
    Math.floor(Date.now() / 1000) + parseDuration(JWT_EXPIRATION);
  const jwtPayload: AuthenticateJwtPayload = {
    userId,
    role,
  };
  const token = jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION as jwt.SignOptions["expiresIn"],
  });

  return { token, expiresAt };
};
export default signJwtToken;
