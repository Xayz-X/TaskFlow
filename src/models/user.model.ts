import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is a required field"],
  },
  email: {
    type: String,
    required: [true, "email is an required field"],
    match: [/\S+@\S+\.\S+/, "Invalid email address"],
  },
  password: {
    type: String,
    required: [true, "password is an required field"],
  },
  role: {
    type: String,
    default: "employee",
    required: [true, "role is a required field"],
    enum: ["admin", "manager", "employee"],
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
