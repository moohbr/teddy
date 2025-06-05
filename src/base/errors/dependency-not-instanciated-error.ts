import { HttpError } from "./http-error";

export class DependencyInstanciatedError extends HttpError {
  constructor(dependencyName: string) {
    super(`Dependency ${dependencyName} not initialized`);
    Object.setPrototypeOf(this, DependencyInstanciatedError.prototype);
  }

  public getStatusCode(): number {
    return 500;
  }
}
