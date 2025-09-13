import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is a required field"],
    },
    email: {
      type: String,
      unique: [true, "user already exist with this email"],
      required: [true, "email is an required field"],
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "password is an required field"],
    },
    role: {
      type: String,
      default: "employee",
      required: [true, "role is a required field"],
      enum: ["admin", "manager", "employee"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
