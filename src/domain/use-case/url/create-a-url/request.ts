import { OriginalUrl } from "@domain/entities/url/value-objects/original-url";

export class CreateUrlRequest {
  constructor(private readonly originalUrl: OriginalUrl) { }

  public getOriginalUrl(): OriginalUrl {
    return this.originalUrl;
  }

  public static create(originalUrlValue: string): CreateUrlRequest {
    const originalUrl = OriginalUrl.create(originalUrlValue);
    return new CreateUrlRequest(originalUrl);
  }
}
