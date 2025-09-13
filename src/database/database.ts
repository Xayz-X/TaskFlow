import mongoose from "mongoose";
import { DATABASE_URI } from "../config/env";

const connectToDatabase = async (): Promise<void> => {
  try {
    if (!DATABASE_URI) {
      console.log("Databse URI not found in the .env file.");
      process.exit(1);
    }
    await mongoose.connect(DATABASE_URI);
    console.log("Connected to the database");
  } catch (error) {
    process.exit(1);
  }
};

export default connectToDatabase;
