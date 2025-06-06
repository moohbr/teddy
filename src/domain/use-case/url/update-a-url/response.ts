import { BaseResponse } from "@base/use-cases/response";
import { URLEntity } from "@domain/entities/url/entity";

export class UpdateUrlResponse extends BaseResponse<URLEntity> {
  public constructor(
    data: URLEntity | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(data, success, message, errors);
  }

  public static success(url: URLEntity): UpdateUrlResponse {
    return UpdateUrlResponse.createSuccess(
      url,
      "URL atualizada com sucesso",
      UpdateUrlResponse
    );
  }

  public static failure(message: string, errors: Error[] = []): UpdateUrlResponse {
    return UpdateUrlResponse.createFailure(
      message,
      errors,
      UpdateUrlResponse
    );
  }

  public static validationFailure(errors: Error[]): UpdateUrlResponse {
    return UpdateUrlResponse.createValidationFailure(
      errors,
      UpdateUrlResponse
    );
  }

  public getData(): URLEntity | null {
    return this.data;
  }
}