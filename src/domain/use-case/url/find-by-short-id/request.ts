import { ShortId } from "@domain/entities/url/value-objects/short-id";

export class FindUrlByShortIdRequest {
  constructor(private readonly shortId: ShortId) { }

  public getShortId(): ShortId {
    return this.shortId;
  }

  public static create(shortIdValue: string): FindUrlByShortIdRequest {
    const shortId = ShortId.reconstruct(shortIdValue);
    return new FindUrlByShortIdRequest(shortId);
  }
}
