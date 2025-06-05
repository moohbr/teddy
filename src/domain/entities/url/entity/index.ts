import { Entity } from "../../../../base/domain/entity/entity.js";
import { ShortId } from "../value-objects/short-id.js";
import { OriginalUrl } from "../value-objects/original-url.js";
import type { URLRawEntity } from "./types.js";

export class URLEntity extends Entity<URLRawEntity> {
  private constructor(
    props: URLRawEntity,
  ) {
    super(props);
  }

  public static create(props: Pick<URLRawEntity, "originalUrl">): URLEntity {
    return new URLEntity(
      {
        shortId: ShortId.create(),
        originalUrl: props.originalUrl,
      }
    );
  }

  public toPersistence(): URLRawEntity {
    return this.props;
  }

  public static reconstruct(data: URLRawEntity): URLEntity {
    return new URLEntity(data);
  }

  public getShortId(): ShortId {
    return this.props.shortId;
  }

  public getOriginalUrl(): OriginalUrl {
    return this.props.originalUrl;
  }
}
