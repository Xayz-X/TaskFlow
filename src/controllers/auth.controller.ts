import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express-serve-static-core";

import parseDuration from "../helpers/datetime";
import UserModel from "../models/user.model";
import { ResponseObject } from "../types/response.type";
import { APIError } from "../helpers/error";
import { StatusCodes } from "../helpers/statusCodes";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/env";
import {
  RegisterRequestBody,
  LoginRequestbody,
} from "../contracts/auth.contract";

export const authRegister = async (
  request: Request<{}, {}, RegisterRequestBody>,
  response: Response<ResponseObject>
): Promise<void> => {
  const { username, email, password } = request.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new APIError(StatusCodes.CONFLICT, "email is taken");
  }

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
  // Query the user by email
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email }).select("+password");

  // 1st -> validate user an exist with the requested email
  // 2nd -> Validate if the hashed password match with the requested password
  if (!user) {
    throw new APIError(StatusCodes.FORBIDDEN, "invalid email or password");
  } else {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new APIError(StatusCodes.FORBIDDEN, "invalid email or password");
    }
  }
  // Generate a new JWT token
  const expiresAt =
    Math.floor(Date.now() / 1000) + parseDuration(JWT_EXPIRATION);
  const jwtToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION as jwt.SignOptions["expiresIn"],
  });

  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCodes.SUCCESS,
    message: `logged in successfuly`,
    data: { token: jwtToken, expiresAt },
  };
  response.status(resp.statusCode).send(resp);
};
export const authRefresh = (request: Request, response: Response): void => {};
export const authLogout = (request: Request, response: Response): void => {};
