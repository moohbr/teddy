import { BaseResponse } from "@base/use-cases/response";
import { UserEntity } from "@domain/entities/user/entity";

export class UpdateUserResponse extends BaseResponse<UserEntity> {
  private constructor(
    user: UserEntity | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(user, success, message, errors);
  }

  public static success(user: UserEntity): UpdateUserResponse {
    return new UpdateUserResponse(user, true, "User updated successfully", []);
  }

  public static failure(message: string, errors: Error[] = []): UpdateUserResponse {
    return new UpdateUserResponse(null, false, message, errors);
  }

  public static validationFailure(errors: Error[]): UpdateUserResponse {
    return new UpdateUserResponse(null, false, "Validation failed", errors);
  }

  public getData(): UserEntity | null {
    return this.data;
  }
}