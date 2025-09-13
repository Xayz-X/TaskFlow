import { NextFunction, Request, Response } from "express-serve-static-core";
import { RegisterRequestBody } from "../contracts/auth.contract";

export const authRegister = (
  request: Request<{}, {}, RegisterRequestBody>,
  response: Response,
  next: NextFunction
): void => {
  const { username, email, password } = request.body;

  response.status(201).send({
    success: true,
    message: `new user created with ${email} ${username}`,
  });
};

export const authLogin = (request: Request, response: Response): void => {};
export const authRefresh = (request: Request, response: Response): void => {};
export const authLogout = (request: Request, response: Response): void => {};
