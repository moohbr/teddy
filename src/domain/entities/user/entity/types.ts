import { UserEmail } from '../value-objects/email';
import { UserId } from '../value-objects/id';
import { UserName } from '../value-objects/name';
import { UserPassword } from '../value-objects/password';

export type UserRawEntity = {
  id?: UserId;
  name: UserName;
  email: UserEmail;
  passwordHash: UserPassword;
  createdAt: Date;
};
