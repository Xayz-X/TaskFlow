import { z } from "zod";
import { userUpdateValidatorSchema } from "../validators/user.validator";

export type UserIdQueryParam = {
  id: string;
};

export type UserUpdateRequestBody = z.infer<typeof userUpdateValidatorSchema>;
