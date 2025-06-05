import { URLEntity } from "@domain/entities/url/entity";
import type { URLRepositoryInterface } from "@domain/entities/url/repositories";
import { OriginalUrl } from "@domain/entities/url/value-objects/original-url";
import { ShortId } from "@domain/entities/url/value-objects/short-id";
import type { URLRawEntity } from "@domain/entities/url/entity/types";
import { eq } from "drizzle-orm";
import { urlsTable } from "../models/url";
import type { DatabaseType } from "../types";


export class URLRepository implements URLRepositoryInterface {
  constructor(private readonly db: DatabaseType) { }

  public async create(originalUrl: OriginalUrl): Promise<URLEntity> {
    const urlEntity = URLEntity.create({
      originalUrl: originalUrl,
    });

    const persistenceData = urlEntity.toPersistence();

    await this.db.insert(urlsTable).values({
      shortId: persistenceData.shortId.getValue(),
      originalUrl: persistenceData.originalUrl.getValue()
    });

    return urlEntity;
  }

  public async findByShortId(shortId: ShortId): Promise<URLEntity | null> {
    const [url] = await this.db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.shortId, shortId.getValue()))
      .limit(1);

    if (!url) return null;

    const reconstructedData: URLRawEntity = {
      shortId: ShortId.reconstruct(url.shortId),
      originalUrl: OriginalUrl.reconstruct(url.originalUrl)
    };

    return URLEntity.reconstruct(reconstructedData);
  }

  public async findByOriginalUrl(originalUrl: OriginalUrl): Promise<URLEntity | null> {
    const [url] = await this.db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.originalUrl, originalUrl.getValue()))
      .limit(1);

    if (!url) return null;

    const reconstructedData: URLRawEntity = {
      shortId: ShortId.reconstruct(url.shortId),
      originalUrl: OriginalUrl.reconstruct(url.originalUrl)
    };

    return URLEntity.reconstruct(reconstructedData);
  }
  public async updateByShortId(shortId: ShortId, originalUrl: OriginalUrl): Promise<URLEntity | null> {
    const [url] = await this.db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.shortId, shortId.getValue()))

    if (!url) return null;

    const reconstructedData: URLRawEntity = {
      shortId: ShortId.reconstruct(url.shortId),
      originalUrl: OriginalUrl.reconstruct(originalUrl.getValue())
    }

    return URLEntity.reconstruct(reconstructedData);
  }
}
