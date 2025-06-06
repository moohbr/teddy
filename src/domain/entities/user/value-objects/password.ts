import { UserSchemas } from "@domain/entities/user/schemas/index.js";
import { ValueObject } from "@base/domain/entity/value-object.js";
import bcrypt from "bcrypt";

export class UserPassword extends ValueObject<string> {
  public static create(value: unknown): UserPassword {
    const validated = UserSchemas.passwordSchema.parse(value);
    return new UserPassword(validated);
  }

  public hash(): string {
    return bcrypt.hashSync(this.value, 10);
  }

  public compareWithHash(value: string): boolean {
    return bcrypt.compareSync(value, this.value);
  }

  public static reconstruct(value: string): UserPassword {
    return this.create(value);
  }
}