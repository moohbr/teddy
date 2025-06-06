import { nanoid } from 'nanoid';
import { z } from 'zod';

import { ValueObject } from '../../../../base/domain/entity/value-object';
import { URLSchema } from '../schemas';

export class ShortId extends ValueObject<z.infer<typeof URLSchema.shortId>> {
  public static create(): ShortId {
    return new ShortId(nanoid(6));
  }

  public static reconstruct(value: unknown): ShortId {
    const validated = URLSchema.shortId.parse(value);
    return new ShortId(validated);
  }
}
