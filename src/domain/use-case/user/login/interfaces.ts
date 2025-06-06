import { LoginRequest } from "./request";
import { LoginResponse } from "./response";

export interface LoginUseCaseInterface {
  execute(request: LoginRequest): Promise<LoginResponse>;
}