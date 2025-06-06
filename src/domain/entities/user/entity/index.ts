import { Entity } from '@base/domain/entity/entity';

import { UserRawEntity } from './types';
import { UserEmail } from '../value-objects/email';
import { UserId } from '../value-objects/id';
import { UserName } from '../value-objects/name';
import { UserPassword } from '../value-objects/password';

export class UserEntity extends Entity<UserRawEntity> {
  private constructor(props: UserRawEntity) {
    super(props);
  }

  public static create(
    props: Pick<UserRawEntity, 'name' | 'email' | 'passwordHash'> & { id?: UserId },
  ): UserEntity {
    return new UserEntity({
      id: props.id,
      name: props.name,
      email: props.email,
      createdAt: new Date(),
      passwordHash: props.passwordHash,
    });
  }

  public static reconstruct(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    passwordHash: string,
  ): UserEntity {
    return new UserEntity({
      id: UserId.create(id),
      name: UserName.create(name),
      email: UserEmail.create(email),
      createdAt: createdAt,
      passwordHash: UserPassword.create(passwordHash),
    });
  }

  public getId(): UserId {
    return this.props.id;
  }

  public getName(): UserName {
    return this.props.name;
  }

  public getEmail(): UserEmail {
    return this.props.email;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getPasswordHash(): UserPassword {
    return this.props.passwordHash;
  }

  public toPersistence(): UserRawEntity {
    return this.props;
  }
}
