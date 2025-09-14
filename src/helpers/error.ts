import { StatusCodes } from "../types/statusCodes";
export class APIError extends Error {
  public statusCode: StatusCodes;

  constructor(statusCode: StatusCodes, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
