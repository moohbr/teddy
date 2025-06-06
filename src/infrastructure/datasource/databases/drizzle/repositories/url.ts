import { and, desc, eq, sql } from 'drizzle-orm';

import { URLEntity } from '@domain/entities/url/entity';
import type { URLRawEntity } from '@domain/entities/url/entity/types';
import type { URLRepositoryInterface } from '@domain/entities/url/repositories';
import { OriginalUrl } from '@domain/entities/url/value-objects/original-url';
import { ShortId } from '@domain/entities/url/value-objects/short-id';
import { UserId } from '@domain/entities/user/value-objects/id';

import { urlsTable } from '../models/url';
import type { DatabaseType } from '../types';

export class URLRepository implements URLRepositoryInterface {
  constructor(private readonly db: DatabaseType) {}

  public async create(originalUrl: OriginalUrl, userId?: UserId): Promise<URLEntity> {
    const urlEntity = URLEntity.create({
      originalUrl: originalUrl,
      userId: userId,
    });

    const persistenceData = urlEntity.toPersistence();

    await this.db.insert(urlsTable).values({
      shortId: persistenceData.shortId.getValue(),
      originalUrl: persistenceData.originalUrl.getValue(),
      userId: persistenceData.userId?.getValue(),
      active: true,
    });

    return urlEntity;
  }

  public async findByShortId(shortId: ShortId): Promise<URLEntity | null> {
    const [url] = await this.db
      .select()
      .from(urlsTable)
      .where(and(eq(urlsTable.shortId, shortId.getValue()), eq(urlsTable.active, true)))
      .limit(1);

    if (!url) return null;

    const reconstructedData: URLRawEntity = {
      shortId: ShortId.reconstruct(url.shortId),
      originalUrl: OriginalUrl.reconstruct(url.originalUrl),
      active: url.active,
      count: url.count,
    };

    return URLEntity.reconstruct(reconstructedData);
  }

  public async findByOriginalUrl(originalUrl: OriginalUrl): Promise<URLEntity | null> {
    const [url] = await this.db
      .select()
      .from(urlsTable)
      .where(and(eq(urlsTable.originalUrl, originalUrl.getValue()), eq(urlsTable.active, true)))
      .limit(1);

    if (!url) return null;

    const reconstructedData: URLRawEntity = {
      shortId: ShortId.reconstruct(url.shortId),
      originalUrl: OriginalUrl.reconstruct(url.originalUrl),
      active: url.active,
      count: url.count,
    };

    return URLEntity.reconstruct(reconstructedData);
  }
  public async updateByShortId(
    shortId: ShortId,
    originalUrl: OriginalUrl,
  ): Promise<URLEntity | null> {
    const [url] = await this.db
      .select()
      .from(urlsTable)
      .where(and(eq(urlsTable.shortId, shortId.getValue()), eq(urlsTable.active, true)));

    if (!url) return null;

    const reconstructedData: URLRawEntity = {
      shortId: ShortId.reconstruct(url.shortId),
      originalUrl: OriginalUrl.reconstruct(originalUrl.getValue()),
      active: url.active,
      count: url.count,
    };

    return URLEntity.reconstruct(reconstructedData);
  }

  public async findAllByUserId(userId: UserId): Promise<URLEntity[]> {
    const urls = await this.db
      .select()
      .from(urlsTable)
      .where(and(eq(urlsTable.userId, userId.getValue()), eq(urlsTable.active, true)))
      .orderBy(desc(urlsTable.count));

    return urls.map((url) => {
      const reconstructedData: URLRawEntity = {
        shortId: ShortId.reconstruct(url.shortId),
        originalUrl: OriginalUrl.reconstruct(url.originalUrl),
        active: url.active,
        count: url.count,
      };
      return URLEntity.reconstruct(reconstructedData);
    });
  }

  public async deleteByShortId(shortId: ShortId): Promise<void> {
    await this.db
      .update(urlsTable)
      .set({ active: false })
      .where(eq(urlsTable.shortId, shortId.getValue()));
  }

  public async incrementCountByShortId(shortId: ShortId): Promise<URLEntity | null> {
    const [url] = await this.db
      .update(urlsTable)
      .set({ count: sql`${urlsTable.count} + 1` })
      .where(eq(urlsTable.shortId, shortId.getValue()))
      .returning();

    if (!url) return null;

    const reconstructedData: URLRawEntity = {
      shortId: ShortId.reconstruct(url.shortId),
      originalUrl: OriginalUrl.reconstruct(url.originalUrl),
      active: url.active,
      count: url.count,
    };

    return URLEntity.reconstruct(reconstructedData);
  }
}
