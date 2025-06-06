import { ShortId } from '@domain/entities/url/value-objects/short-id';
import { UserId } from '@domain/entities/user/value-objects/id';

export class DeleteByShortIdRequest {
  constructor(
    private readonly shortId: ShortId,
    private readonly userId: UserId,
  ) {}

  public static create(shortId: string, userId: string): DeleteByShortIdRequest {
    return new DeleteByShortIdRequest(ShortId.reconstruct(shortId), UserId.create(userId));
  }

  public getShortId(): ShortId {
    return this.shortId;
  }

  public getUserId(): UserId {
    return this.userId;
  }
}
