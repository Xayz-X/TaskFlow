// auth/register route request body
export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}
// auth/login
export interface LoginRequestBody {
  email: string;
  password: string;
}
