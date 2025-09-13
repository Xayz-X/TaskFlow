import { config } from "dotenv";
config({ path: ".env" });

export const { PORT, ENVIRONMENT, DATABASE_URI } = process.env;
