import { UserEntity } from '@domain/entities/user/entity';

export type AuthResult = {
  token: string;
  user: UserEntity;
};
