import { UserId } from '@domain/entities/user/value-objects/id.js';

import type { URLRawEntity } from './types.js';
import { Entity } from '../../../../base/domain/entity/entity.js';
import { OriginalUrl } from '../value-objects/original-url.js';
import { ShortId } from '../value-objects/short-id.js';

export class URLEntity extends Entity<URLRawEntity> {
  private constructor(props: URLRawEntity) {
    super(props);
  }

  public static create(props: Pick<URLRawEntity, 'originalUrl' | 'userId'>): URLEntity {
    return new URLEntity({
      shortId: ShortId.create(),
      originalUrl: props.originalUrl,
      userId: props.userId,
      active: true,
      count: 0,
    });
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

  public getUserId(): UserId | undefined {
    return this.props.userId;
  }

  public getActive(): boolean {
    return this.props.active;
  }

  public getCount(): number {
    return this.props.count;
  }

  public isOwner(userId: UserId): boolean {
    return this.props.userId?.getValue() === userId.getValue() || false;
  }
}
