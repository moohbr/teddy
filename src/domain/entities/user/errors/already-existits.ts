import { ValidationError } from '@base/errors/validation-error';

export class UserAlreadyExistsError extends ValidationError {
  constructor(message: string) {
    super(message);
  }
}
