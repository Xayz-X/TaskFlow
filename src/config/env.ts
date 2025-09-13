import { config } from "dotenv";
config({ path: ".env" });

export const { PORT, ENVIRONMENT, DATABASE_URI } = process.env;
export const JWT_SECRET: string = process.env.JWT_SECRET! as string;
export const JWT_EXPIRATION: string | number = process.env.JWT_EXPIRATION!;
