// auth/register route request body
import { z } from "zod";
import {
  loginValidateSchema,
  registerValidatorSchema,
} from "../validators/auth.validator";

// register body
export type RegisterRequestBody = z.infer<typeof registerValidatorSchema>;
export type LoginRequestbody = z.infer<typeof loginValidateSchema>;
