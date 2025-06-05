import { NotFoundError } from "@base/errors/not-found-error";

export class UrlNotFoundError extends NotFoundError {
  constructor(shortId: string) {
    super(`URL with short ID '${shortId}' not found`);
    this.name = "UrlNotFoundError";
  }
}
