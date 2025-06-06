import { UserEntity } from '../entity';
import { UserEmail } from '../value-objects/email';
import { UserId } from '../value-objects/id';

export interface UserRepositoryInterface {
  create(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: UserEmail): Promise<UserEntity | null>;
  findById(id: UserId): Promise<UserEntity | null>;
  update(id: UserId, user: UserEntity): Promise<UserEntity | null>;
  delete(id: UserId): Promise<void>;
}
