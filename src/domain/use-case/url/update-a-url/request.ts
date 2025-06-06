import { OriginalUrl } from "@domain/entities/url/value-objects/original-url";
import { ShortId } from "@domain/entities/url/value-objects/short-id";
import { UserId } from "@domain/entities/user/value-objects/id";

export class UpdateUrlRequest {
  constructor(
    private readonly shortId: ShortId,
    private readonly originalUrl: OriginalUrl,
    private readonly userId: UserId,
  ) {}

  public static create(shortId: string, originalUrl: string, userId: string): UpdateUrlRequest {
    return new UpdateUrlRequest(
      ShortId.reconstruct(shortId),
      OriginalUrl.create(originalUrl),
      UserId.create(userId),
    );
  }

  public getShortId(): ShortId {
    return this.shortId;
  }
  
  public getOriginalUrl(): OriginalUrl {
    return this.originalUrl;
  }

  public getUserId(): UserId {
    return this.userId;
  }
}