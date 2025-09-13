import { Router } from "express";

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

import validateRequestMiddleware from "../middlewares/validate.middleware";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequestMiddleware(registerValidatorSchema),
  authRegister
); // admin

authRouter.post(
  "/login",
  validateRequestMiddleware(loginValidateSchema),
  authLogin
);
authRouter.get("/refresh", authRefresh);
authRouter.post("/logout", authLogout);

export default authRouter;
