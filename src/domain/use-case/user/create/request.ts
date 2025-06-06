import { UserEmail } from '@domain/entities/user/value-objects/email';
import { UserName } from '@domain/entities/user/value-objects/name';
import { UserPassword } from '@domain/entities/user/value-objects/password';

export class CreateUserRequest {
  constructor(
    private readonly name: UserName,
    private readonly email: UserEmail,
    private readonly password: UserPassword,
  ) {}

  public static create(name: string, email: string, password: string): CreateUserRequest {
    return new CreateUserRequest(
      UserName.create(name),
      UserEmail.create(email),
      UserPassword.create(password),
    );
  }
  public getName(): UserName {
    return this.name;
  }

  public getEmail(): UserEmail {
    return this.email;
  }

  public getPassword(): UserPassword {
    return this.password;
  }
}
