import bcrypt from "bcrypt";
import { Request, Response } from "express-serve-static-core";
import UserModel from "../models/user.model";
import { ResponseObject } from "../types/response.type";
import {
  UserIdQueryParam,
  UserUpdateRequestBody,
} from "../contracts/user.contract";
import { APIError } from "../helpers/error";
import { StatusCode } from "../types/status-code.enum";

export const getAllUsers = async (
  request: Request,
  response: Response<ResponseObject>
): Promise<void> => {
  const users = await UserModel.find();
  const resp: ResponseObject = {
    success: true,
    statusCode: 200,
    message: "all the users",
    data: users,
  };

  response.status(resp.statusCode).send(resp);
};

export const getUser = async (
  request: Request<UserIdQueryParam>,
  response: Response<ResponseObject>
) => {
  if (!request.user) {
    return;
  }
  const userId = request.params.id;
  if (userId !== request.user._id.toString()) {
    throw new APIError(StatusCode.BAD_REQUEST, "invalid user id");
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new APIError(StatusCode.NOT_FOUND, "user not found, invalid user id");
  }

  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCode.SUCCESS,
    message: "user found",
    data: user,
  };
  response.status(resp.statusCode).send(resp);
};

export const updateUser = async (
  request: Request<UserIdQueryParam, {}, UserUpdateRequestBody>,
  response: Response<ResponseObject>
): Promise<void> => {
  if (!request.user) {
    return;
  }

  const userId = request.params.id;
  if (userId !== request.user._id.toString()) {
    throw new APIError(
      StatusCode.FORBIDDEN,
      "you don't have permission to update other user"
    );
  }

  const { password } = request.body;
  if (password) {
    // lets hash the new password
    const salt = await bcrypt.genSalt();
    request.body.password = await bcrypt.hash(password, salt);
  }

  await UserModel.updateOne({ _id: userId }, { $set: { ...request.body } });

  const resp: ResponseObject = {
    success: true,
    statusCode: StatusCode.SUCCESS,
    message: "resource udpated",
    data: { ...request.body },
  };
  response.status(resp.statusCode).send(resp);
};

export const deleteUser = async (
  request: Request<UserIdQueryParam>,
  response: Response<ResponseObject>
): Promise<void> => {
  if (!request.user) {
    return;
  }

  const userId = request.params.id;
  if (userId === request.user._id.toString()) {
    throw new APIError(StatusCode.BAD_REQUEST, "you can't delete yourself");
  }
  const deletedUser = await UserModel.deleteOne({ _id: userId });
  const resp: ResponseObject = {
    success: deletedUser.deletedCount > 0 ? true : false,
    statusCode:
      deletedUser.deletedCount > 0
        ? StatusCode.SUCCESS
        : StatusCode.BAD_REQUEST,
    message:
      deletedUser.deletedCount > 0 ? "user has been deleted" : "user not found",
    data: { userId },
  };
  response.status(resp.statusCode).send(resp);
};
