import { HttpError } from './http-error';

export class ValidationError extends HttpError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  public getStatusCode(): number {
    return 400;
  }
}
