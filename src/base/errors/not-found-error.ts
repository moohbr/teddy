import { HttpError } from './http-error';

export abstract class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public getStatusCode(): number {
    return 404;
  }
}
