import { Router } from "express";
import authorizeMiddleware from "../middlewares/authorize.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import {
  authRegister,
  authLogin,
  authRefresh,
  authLogout,
} from "../controllers/auth.controller";

import {
  registerValidatorSchema,
  loginValidateSchema,
} from "../validators/auth.validator";

import requestValidatorMiddleware from "../middlewares/validate.middleware";
import { UserRole } from "../types/user-role.enum";

const authRouter = Router();

authRouter.post(
  "/register",
  authorizeMiddleware(), // user must be authorize to do it
  roleMiddleware(UserRole.Admin), // only admin can create new user
  requestValidatorMiddleware(registerValidatorSchema),
  authRegister
);

authRouter.post(
  "/login",
  requestValidatorMiddleware(loginValidateSchema),
  authLogin
);
authRouter.get("/refresh", authorizeMiddleware(true), authRefresh);
authRouter.post("/logout", authorizeMiddleware(true), authLogout);

export default authRouter;
