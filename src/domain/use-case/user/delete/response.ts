import { BaseResponse } from "@base/use-cases/response";
import { UserEntity } from "@domain/entities/user/entity";

export class DeleteUserResponse extends BaseResponse<UserEntity | null> {
  private constructor(
    data: UserEntity | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(data, success, message, errors);
  }

  public static success(user: UserEntity): DeleteUserResponse {
    return new DeleteUserResponse(user, true, "User deleted successfully", []);
  }

  public static failure(message: string, errors: Error[] = []): DeleteUserResponse {
    return new DeleteUserResponse(null, false, message, errors);
  }

  public static validationFailure(errors: Error[]): DeleteUserResponse {
    return new DeleteUserResponse(null, false, "Validation failed", errors);
  }

  public getData(): UserEntity | null {
    return this.data;
  }
}