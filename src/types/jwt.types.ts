import { UserRole } from "./user-role.enum";

export interface AuthenticateJwtPayload {
  userId: string;
  role: UserRole;
}
