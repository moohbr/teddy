import { z } from 'zod';

import { ValueObject } from '../../../../base/domain/entity/value-object';
import { URLSchema } from '../schemas';

export class OriginalUrl extends ValueObject<z.infer<typeof URLSchema.originalUrl>> {
  public static create(value: unknown): OriginalUrl {
    const validated = URLSchema.originalUrl.parse(value);
    return new OriginalUrl(validated);
  }

  public static reconstruct(value: unknown): OriginalUrl {
    return this.create(value);
  }
}
