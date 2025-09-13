import { config } from "dotenv";
config({ path: ".env" });

export const { PORT, ENVIRONMENT } = process.env;
