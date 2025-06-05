import { BaseResponse } from "@base/use-cases/response";
import { URLEntity } from "@domain/entities/url/entity";

export class CreateUrlResponse extends BaseResponse<URLEntity> {
  public constructor(
    data: URLEntity | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(data, success, message, errors);
  }

  public static success(urlEntity: URLEntity): CreateUrlResponse {
    return CreateUrlResponse.createSuccess(
      urlEntity,
      "URL criada com sucesso",
      CreateUrlResponse
    );
  }

  public static failure(message: string, errors: Error[] = []): CreateUrlResponse {
    return CreateUrlResponse.createFailure(
      message,
      errors,
      CreateUrlResponse
    );
  }

  public static validationFailure(errors: Error[]): CreateUrlResponse {
    return CreateUrlResponse.createValidationFailure(
      errors,
      CreateUrlResponse
    );
  }

  public getData(): URLEntity | null {
    return this.data;
  }
}
