// auth/register route request body
import { z } from "zod";
import { registerValidatorSchema } from "../validators/auth.validator";

// register body
export type RegisterRequestBody = z.infer<typeof registerValidatorSchema>;
