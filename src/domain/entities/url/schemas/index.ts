import { z } from 'zod';

export class URLSchema {
  public static readonly originalUrl = z.string().url();
  public static readonly shortId = z.string().length(6);
  // public static readonly accessCounter = z.coerce.number().min(1);

  public static readonly createUrl = z.object({
    originalUrl: this.originalUrl,
  });

  public static readonly urlEntity = z.object({
    originalUrl: this.originalUrl,
    shortId: this.shortId,
    // accessCounter: this.accessCounter,
  });
}
