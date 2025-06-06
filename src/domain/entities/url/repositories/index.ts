import { UserId } from "@domain/entities/user/value-objects/id";
import type { URLEntity } from "../entity";
import type { OriginalUrl } from "../value-objects/original-url";
import type { ShortId } from "../value-objects/short-id";

export interface URLRepositoryInterface {
  create(originalUrl: OriginalUrl, userId?: UserId): Promise<URLEntity>;
  findByShortId(shortId: ShortId): Promise<URLEntity | null>;
  findByOriginalUrl(originalUrl: OriginalUrl): Promise<URLEntity | null>;
  findAllByUserId(userId: UserId): Promise<URLEntity[]>;
  updateByShortId(shortId: ShortId, originalUrl: OriginalUrl): Promise<URLEntity | null>;
  deleteByShortId(shortId: ShortId): Promise<void>;
  incrementCountByShortId(shortId: ShortId): Promise<URLEntity | null>;
}
