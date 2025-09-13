import { Router } from "express";
import {
  authRegister,
  authLogin,
  authRefresh,
  authLogout,
} from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { registerValidatorSchema } from "../validators/auth.validator";
const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(registerValidatorSchema),
  authRegister
); // admin
authRouter.post("/login", authLogin);
authRouter.post("/refresh", authRefresh);
authRouter.post("/logout", authLogout);

export default authRouter;
