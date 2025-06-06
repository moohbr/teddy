import { BaseResponse } from "@base/use-cases/response";
import { AuthResult } from "@domain/use-case/user/login/types";

export class LoginResponse extends BaseResponse<AuthResult> {
  private constructor(
    authResult: AuthResult | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(authResult, success, message, errors);
  }

  public static success(authResult: AuthResult): LoginResponse {
    return new LoginResponse(authResult, true, "Login successful", []);
  }

  public static failure(message: string, errors: Error[] = []): LoginResponse {
    return new LoginResponse(null, false, message, errors);
  }

  public static validationFailure(errors: Error[]): LoginResponse {
    return new LoginResponse(null, false, "Validation failed", errors);
  }

  public getData(): AuthResult | null {
    return this.data;
  }
}