import type { URLEntity } from "../entity";
import type { OriginalUrl } from "../value-objects/original-url";
import type { ShortId } from "../value-objects/short-id";

export interface URLRepositoryInterface {
  create(originalUrl: OriginalUrl): Promise<URLEntity>;
  findByShortId(shortId: ShortId): Promise<URLEntity | null>;
  findByOriginalUrl(originalUrl: OriginalUrl): Promise<URLEntity | null>;
  updateByShortId(shortId: ShortId, originalUrl: OriginalUrl): Promise<URLEntity | null>;
}
