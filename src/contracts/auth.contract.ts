import { z } from "zod";
import {
  loginValidateSchema,
  registerValidatorSchema,
} from "../validators/auth.validator";

// auth/register request body
export type RegisterRequestBody = z.infer<typeof registerValidatorSchema>;
// auth/login request body
export type LoginRequestbody = z.infer<typeof loginValidateSchema>;
