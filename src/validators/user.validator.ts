import { z } from "zod";

export const userUpdateValidatorSchema = z
  .object({
    username: z.string().optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
  })
  .strict();
