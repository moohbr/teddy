import { BaseResponse } from './response';

export abstract class EntityResponse<T> extends BaseResponse<T> {
  protected constructor(
    data: T | null,
    success: boolean,
    message: string,
    errors: Error[],
    private readonly errorClass: new (message?: string) => Error,
  ) {
    super(data, success, message, errors);
  }

  public getData(): T {
    if (!this.data) {
      throw new this.errorClass('Cannot get data from failed response');
    }
    return this.data;
  }
}
