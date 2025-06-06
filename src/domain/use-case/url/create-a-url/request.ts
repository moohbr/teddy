import { OriginalUrl } from "@domain/entities/url/value-objects/original-url";
import { UserId } from "@domain/entities/user/value-objects/id";

export class CreateUrlRequest {
  constructor(private readonly originalUrl: OriginalUrl, private readonly userId?: UserId) { }

  public getOriginalUrl(): OriginalUrl {
    return this.originalUrl;
  }

  public static create(originalUrlValue: string, userIdValue?: string): CreateUrlRequest {
    const originalUrl = OriginalUrl.create(originalUrlValue);
    const userId = userIdValue ? UserId.create(userIdValue) : undefined;

    return new CreateUrlRequest(originalUrl, userId);
  }

  public getUserId(): UserId | undefined {
    return this.userId;
  }
}
