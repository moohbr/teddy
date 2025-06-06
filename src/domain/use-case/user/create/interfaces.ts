import { CreateUserRequest } from "@useCases/user/create/request";
import { CreateUserResponse } from "@useCases/user/create/response";

export interface CreateUserUseCaseInterface {
  execute(request: CreateUserRequest): Promise<CreateUserResponse>;
}