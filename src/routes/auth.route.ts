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

import requestValidatorMiddleware from "../middlewares/validate.middleware";

const authRouter = Router();

authRouter.post(
  "/register",
  requestValidatorMiddleware(registerValidatorSchema),
  authRegister
); // admin

authRouter.post(
  "/login",
  requestValidatorMiddleware(loginValidateSchema),
  authLogin
);
authRouter.get("/refresh", authRefresh);
authRouter.post("/logout", authLogout);

export default authRouter;
