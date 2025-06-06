import { BaseResponse } from '@base/use-cases/response';
import type { URLEntity } from '@domain/entities/url/entity';

export class FindUrlByShortIdResponse extends BaseResponse<URLEntity> {
  public constructor(data: URLEntity | null, success: boolean, message: string, errors: Error[]) {
    super(data, success, message, errors);
  }

  public static success(urlEntity: URLEntity): FindUrlByShortIdResponse {
    return FindUrlByShortIdResponse.createSuccess(
      urlEntity,
      'URL encontrada com sucesso',
      FindUrlByShortIdResponse,
    );
  }

  public static notFound(): FindUrlByShortIdResponse {
    return FindUrlByShortIdResponse.createFailure(
      'URL não encontrada',
      [],
      FindUrlByShortIdResponse,
    );
  }

  public static failure(message: string, errors: Error[] = []): FindUrlByShortIdResponse {
    return FindUrlByShortIdResponse.createFailure(message, errors, FindUrlByShortIdResponse);
  }

  public getData(): URLEntity | null {
    return this.data;
  }

  public isNotFound(): boolean {
    return !this.success && this.message === 'URL não encontrada';
  }
}
