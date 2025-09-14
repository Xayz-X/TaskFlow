export type ResponseObject<T = any> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
};
