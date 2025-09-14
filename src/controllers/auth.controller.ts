import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";

import UserModel from "../models/user.model";
import { ResponseObject } from "../types/response.type";
import { APIError } from "../helpers/error";
import { StatusCode } from "../types/StatusCode.enum";
import signJwtToken from "../helpers/authsign";

import {
  RegisterRequestBody,
  LoginRequestbody,
} from "../contracts/auth.contract";

export const authRegister = async (
  request: Request<{}, {}, RegisterRequestBody>,
  response: Response<ResponseObject>
): Promise<void> => {
  const { username, email, password } = request.body;
  // Check if a user already exist with same email
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new APIError(StatusCode.CONFLICT, "email is taken");
  }
  // Hashed the password before store in DB
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create([
    { username, email, password: hashedPassword },
  ]);

  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCode.RESOURCE_CREATED,
    message: `user has been created`,
    data: newUser,
  };
  response.status(resp.statusCode).send(resp);
};

export const authLogin = async (
  request: Request<{}, {}, LoginRequestbody>,
  response: Response<ResponseObject>
): Promise<void> => {
  // Query the user by email
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email }).select("+password");
  // 1st -> Validate user exist with the requested email
  // 2nd -> Validate if the hashed password match with the requested password
  if (!user) {
    throw new APIError(StatusCode.FORBIDDEN, "invalid email or password");
  } else {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new APIError(StatusCode.FORBIDDEN, "invalid email or password");
    }
  }
  // Generate a new JWT token
  const { token, expiresAt } = signJwtToken(user._id.toString(), user.role);

  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCode.SUCCESS,
    message: `logged in successfuly`,
    data: { token, expiresAt },
  };
  response.status(resp.statusCode).send(resp);
};
export const authRefresh = async (
  request: Request,
  response: Response
): Promise<void> => {
  // we will have already the user else it will raise error in authorize middleware
  if (!request.user) {
    return;
  }
  // Generate a new JWT token
  const { token, expiresAt } = signJwtToken(
    request.user._id.toString(),
    request.user.role
  );
  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCode.SUCCESS,
    message: `token refreshed successfully`,
    data: { token, expiresAt },
  };
  response.status(resp.statusCode).send(resp);
};
export const authLogout = (request: Request, response: Response): void => {};
