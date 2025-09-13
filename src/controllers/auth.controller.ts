import { NextFunction, Request, Response } from "express-serve-static-core";
import {
  RegisterRequestBody,
  LoginRequestbody,
} from "../contracts/auth.contract";
import UserModel from "../models/user.model";

export const authRegister = async (
  request: Request<{}, {}, RegisterRequestBody>,
  response: Response
): Promise<void> => {
  const { username, email, password } = request.body;
  const newUser = await UserModel.create([{ username, email, password }]);

  response.status(201).send({
    success: true,
    data: newUser[0],
  });
};

export const authLogin = (
  request: Request<{}, {}, LoginRequestbody>,
  response: Response
): void => {
  const { email, password } = request.body;
  response.send(`Hello working... ${email} ${password}`);
};
export const authRefresh = (request: Request, response: Response): void => {};
export const authLogout = (request: Request, response: Response): void => {};
