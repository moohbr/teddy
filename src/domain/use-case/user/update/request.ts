import { UserEmail } from '@domain/entities/user/value-objects/email';
import { UserId } from '@domain/entities/user/value-objects/id';
import { UserName } from '@domain/entities/user/value-objects/name';
import { UserPassword } from '@domain/entities/user/value-objects/password';

export class UpdateUserRequest {
  constructor(
    private readonly id: UserId,
    private readonly name?: UserName,
    private readonly email?: UserEmail,
    private readonly password?: UserPassword,
  ) {}

  public static create(
    id: UserId,
    name?: UserName,
    email?: UserEmail,
    password?: UserPassword,
  ): UpdateUserRequest {
    return new UpdateUserRequest(id, name, email, password);
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): UserName | undefined {
    return this.name;
  }

  public getEmail(): UserEmail | undefined {
    return this.email;
  }

  public getPassword(): UserPassword | undefined {
    return this.password;
  }
}
