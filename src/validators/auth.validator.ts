import { z } from "zod";
// register route validator
export const registerValidatorSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(6),
});
