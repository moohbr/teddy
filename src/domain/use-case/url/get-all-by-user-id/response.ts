import { BaseResponse } from '@base/use-cases/response';
import { URLEntity } from '@domain/entities/url/entity';

export class GetAllByUserIdResponse extends BaseResponse<URLEntity[]> {
  public constructor(data: URLEntity[] | null, success: boolean, message: string, errors: Error[]) {
    super(data, success, message, errors);
  }

  public static success(urls: URLEntity[]): GetAllByUserIdResponse {
    return GetAllByUserIdResponse.createSuccess(
      urls,
      'URLs encontradas com sucesso',
      GetAllByUserIdResponse,
    );
  }

  public static failure(message: string, errors: Error[] = []): GetAllByUserIdResponse {
    return GetAllByUserIdResponse.createFailure(message, errors, GetAllByUserIdResponse);
  }

  public static validationFailure(errors: Error[]): GetAllByUserIdResponse {
    return GetAllByUserIdResponse.createValidationFailure(errors, GetAllByUserIdResponse);
  }

  public getData(): URLEntity[] | null {
    return this.data;
  }
}
