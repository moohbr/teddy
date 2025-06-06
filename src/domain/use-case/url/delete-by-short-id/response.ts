import { BaseResponse } from "@base/use-cases/response";

export class DeleteByShortIdResponse extends BaseResponse<void> {
  public constructor(
    data: void | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(data, success, message, errors);
  }

  public static success(): DeleteByShortIdResponse {
    return DeleteByShortIdResponse.createSuccess(
      undefined,
      "URL deletada com sucesso",
      DeleteByShortIdResponse
    );
  }

  public static failure(message: string, errors: Error[] = []): DeleteByShortIdResponse {
    return DeleteByShortIdResponse.createFailure(
      message,
      errors,
      DeleteByShortIdResponse
    );
  }

  public static validationFailure(errors: Error[]): DeleteByShortIdResponse {
    return DeleteByShortIdResponse.createValidationFailure(
      errors,
      DeleteByShortIdResponse
    );
  }
}