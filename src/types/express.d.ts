import { InferSchemaType, Types } from "mongoose";
import UserModel from "../models/user.model";

type User = InferSchemaType<typeof UserModel.schema> & { _id: Types.ObjectId };

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
