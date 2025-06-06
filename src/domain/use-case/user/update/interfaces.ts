import { UpdateUserRequest } from '@domain/use-case/user/update/request';
import { UpdateUserResponse } from '@domain/use-case/user/update/response';

export interface UpdateUserUseCaseInterface {
  execute(request: UpdateUserRequest): Promise<UpdateUserResponse>;
}
