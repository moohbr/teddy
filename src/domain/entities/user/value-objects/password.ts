import bcrypt from 'bcrypt';

import { ValueObject } from '@base/domain/entity/value-object.js';
import { UserSchemas } from '@domain/entities/user/schemas/index.js';

export class UserPassword extends ValueObject<string> {
  public static create(value: unknown): UserPassword {
    const cleanValue = typeof value === 'string' ? value.replace(/^["'](.*)["']$/, '$1') : value;
    const validated = UserSchemas.passwordSchema.parse(cleanValue);
    return new UserPassword(validated);
  }

  public hash(): string {
    return bcrypt.hashSync(this.value, 10);
  }

  public compareWithHash(plainTextPassword: string): boolean {
    return bcrypt.compareSync(plainTextPassword, this.value);
  }

  public compare(plainTextPassword: string): boolean {
    return this.value === plainTextPassword;
  }

  public static reconstruct(value: string): UserPassword {
    return new UserPassword(value);
  }
}
