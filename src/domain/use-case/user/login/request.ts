import { UserEmail } from "@domain/entities/user/value-objects/email";
import { UserPassword } from "@domain/entities/user/value-objects/password";

export class LoginRequest {
  private readonly email: UserEmail;
  private readonly password: UserPassword;

  constructor(email: UserEmail, password: UserPassword) {
    this.email = email;
    this.password = password;
  }

  public static create(email: UserEmail, password: UserPassword): LoginRequest {
    return new LoginRequest(
      email,
      password
    );
  }

  public getEmail(): UserEmail {
    return this.email;
  }

  public getPassword(): UserPassword {
    return this.password;
  }
}