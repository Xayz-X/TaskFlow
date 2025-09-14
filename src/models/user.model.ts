import mongoose from "mongoose";
import { UserRole } from "../types/user-role.enum";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is a required field"],
    },
    role: {
      type: String,
      default: UserRole.Employee,
      required: [true, "role is a required field"],
      enum: Object.values(UserRole),
    },
    email: {
      type: String,
      required: [true, "email is an required field"],
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "password is an required field"],
    },
    isLoggedIn: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
