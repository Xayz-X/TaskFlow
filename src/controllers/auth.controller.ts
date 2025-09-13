import { Request, Response } from "express-serve-static-core";
import {
  RegisterRequestBody,
  LoginRequestbody,
} from "../contracts/auth.contract";
import UserModel from "../models/user.model";
import { ResponseObject } from "../types/response";
import bcrypt from "bcrypt";
import { APIError } from "../helpers/error";
import { StatusCodes } from "../helpers/statusCodes";

export const authRegister = async (
  request: Request<{}, {}, RegisterRequestBody>,
  response: Response<ResponseObject>
): Promise<void> => {
  const { username, email, password } = request.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create([
    { username, email, password: hashedPassword },
  ]);

  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCodes.RESOURCE_CREATED,
    message: `user has been created`,
    data: newUser,
  };
  response.status(resp.statusCode).send(resp);
};

export const authLogin = async (
  request: Request<{}, {}, LoginRequestbody>,
  response: Response<ResponseObject>
): Promise<void> => {
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw new APIError(StatusCodes.FORBIDDEN, "invalid email or password");
  }
  // why here still shwoin suer possibly null?
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new APIError(StatusCodes.FORBIDDEN, "invalid email or password");
  }

  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCodes.SUCCESS,
    message: `logged in successfuly`,
    data: user,
  };
  response.status(resp.statusCode).send(resp);
};
export const authRefresh = (request: Request, response: Response): void => {};
export const authLogout = (request: Request, response: Response): void => {};
