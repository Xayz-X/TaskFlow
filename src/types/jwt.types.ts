import { UserRole } from "./roles.type";

export interface AuthenticateJwtPayload {
  userId: string;
  role: UserRole;
}
