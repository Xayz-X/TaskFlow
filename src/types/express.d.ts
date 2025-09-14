import { InferSchemaType } from "mongoose";
import UserModel from "../models/user.model";

type User = InferSchemaType<typeof UserModel.schema>;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
