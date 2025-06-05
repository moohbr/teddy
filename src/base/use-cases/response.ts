export abstract class BaseResponse<T = void> {
  protected constructor(
    protected readonly data: T | null,
    protected readonly success: boolean,
    protected readonly message: string,
    protected readonly errors: Error[],
  ) { }

  public isSuccess(): boolean {
    return this.success;
  }

  public getMessage(): string {
    return this.message;
  }

  public getErrors(): Error[] {
    return this.errors;
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  protected static createSuccess<T>(
    data: T,
    message: string,
    ResponseClass: new (data: T | null, success: boolean, message: string, errors: Error[]) => any
  ) {
    return new ResponseClass(data, true, message, []);
  }

  protected static createFailure<T>(
    message: string,
    errors: Error[] = [],
    ResponseClass: new (data: T | null, success: boolean, message: string, errors: Error[]) => any
  ) {
    return new ResponseClass(null, false, message, errors);
  }

  protected static createValidationFailure<T>(
    errors: Error[],
    ResponseClass: new (data: T | null, success: boolean, message: string, errors: Error[]) => any
  ) {
    return new ResponseClass(null, false, "Validation failed", errors);
  }
}

