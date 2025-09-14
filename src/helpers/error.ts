import { StatusCode } from "../types/status-code.enum";
export class APIError extends Error {
  public statusCode: StatusCode;

  constructor(statusCode: StatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
