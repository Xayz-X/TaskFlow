import { Router } from "express";
import {
  authRegister,
  authLogin,
  authRefresh,
  authLogout,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", authRegister); // admin
authRouter.post("/login", authLogin);
authRouter.post("/refresh", authRefresh);
authRouter.post("/logout", authLogout);

export default authRouter;
