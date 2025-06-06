import { BaseResponse } from '@base/use-cases/response';
import { UserEntity } from '@domain/entities/user/entity';

export class CreateUserResponse extends BaseResponse<UserEntity> {
  public constructor(data: UserEntity | null, success: boolean, message: string, errors: Error[]) {
    super(data, success, message, errors);
  }

  public static success(user: UserEntity): CreateUserResponse {
    return CreateUserResponse.createSuccess(user, 'Usuário criado com sucesso', CreateUserResponse);
  }

  public static failure(message: string, errors: Error[] = []): CreateUserResponse {
    return CreateUserResponse.createFailure(message, errors, CreateUserResponse);
  }

  public static validationFailure(errors: Error[]): CreateUserResponse {
    return CreateUserResponse.createValidationFailure(errors, CreateUserResponse);
  }

  public getData(): UserEntity | null {
    return this.data;
  }
}
