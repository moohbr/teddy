import { NotFoundError } from "@base/errors/not-found-error";

export class UserNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message);
  }
}