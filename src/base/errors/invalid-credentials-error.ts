import { HttpError } from '@base/errors/http-error';

export class InvalidCredentialsError extends HttpError {
  constructor(message: string) {
    super(message);
  }

  public getStatusCode(): number {
    return 401;
  }
}
