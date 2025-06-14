import { ValueObject } from '@base/domain/entity/value-object';
import { UserSchemas } from '@domain/entities/user/schemas';

export class UserId extends ValueObject<string> {
  public static create(value: unknown): UserId {
    const validated = UserSchemas.userIdSchema.parse(value);
    return new UserId(validated);
  }
  public static reconstruct(value: string): UserId {
    return this.create(value);
  }
}
