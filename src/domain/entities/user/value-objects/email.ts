import { ValueObject } from '@base/domain/entity/value-object';
import { UserSchemas } from '@domain/entities/user/schemas';

export class UserEmail extends ValueObject<string> {
  public static create(value: unknown): UserEmail {
    const cleanValue = typeof value === 'string' ? value.replace(/^["'](.*)["']$/, '$1') : value;
    const validated = UserSchemas.emailSchema.parse(cleanValue);
    return new UserEmail(validated);
  }
  public static reconstruct(value: string): UserEmail {
    return this.create(value);
  }
}
