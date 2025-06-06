import { DeleteUserRequest } from '@domain/use-case/user/delete/request';
import { DeleteUserResponse } from '@domain/use-case/user/delete/response';

export interface DeleteUserUseCaseInterface {
  execute(request: DeleteUserRequest): Promise<DeleteUserResponse>;
}
