import { HttpError } from "./http-error";

export class NotAuthorizedError extends HttpError {
  constructor(message: string) {
    super(message);
  }

  public getStatusCode(): number {
    return 401;
  }
}