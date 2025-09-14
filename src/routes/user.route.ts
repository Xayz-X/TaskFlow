import { Router } from "express";
import { Request, Response } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import roleMiddleware from "../middlewares/role.middleware";
import { UserRole } from "../types/user-role.enum";
import authorizeMiddleware from "../middlewares/authorize.middleware";
import { userUpdateValidatorSchema } from "../validators/user.validator";
import requestValidatorMiddleware from "../middlewares/validate.middleware";

const userRouter = Router();

userRouter.get(
  "/",
  authorizeMiddleware(),
  roleMiddleware(UserRole.Admin),
  getAllUsers
);

userRouter.get("/:id", authorizeMiddleware(), getUser);

userRouter.put(
  "/:id",
  authorizeMiddleware(),
  requestValidatorMiddleware(userUpdateValidatorSchema),
  updateUser
);

userRouter.delete(
  "/:id",
  authorizeMiddleware(),
  roleMiddleware(UserRole.Admin),
  deleteUser
);

export default userRouter;
