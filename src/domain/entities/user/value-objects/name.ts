import { UserSchemas } from "@domain/entities/user/schemas";
import { ValueObject } from "@base/domain/entity/value-object";

export class UserName extends ValueObject<string> {
  public static create(value: unknown): UserName {
    const cleanValue = typeof value === 'string' ? value.replace(/^["'](.*)["']$/, '$1') : value;
    const validated = UserSchemas.nameSchema.parse(cleanValue);
    return new UserName(validated);
  }
  public static reconstruct(value: string): UserName {
    return this.create(value);
  }
}