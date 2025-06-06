import { UserRawEntity } from '@domain/entities/user/entity/types';

export type TokenPayload = {
  user: Pick<UserRawEntity, 'id' | 'name' | 'email'> & {
    iat: number;
    exp: number;
  };
};
