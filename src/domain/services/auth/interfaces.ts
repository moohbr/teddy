import { TokenPayload } from './types';

export interface AuthServiceInterface {
  hashPassword(raw: string): Promise<string>;
  comparePassword(raw: string, hash: string): Promise<boolean>;
  generateToken(user: Pick<TokenPayload['user'], 'id' | 'name' | 'email'>): string;
  verifyToken(token: string): TokenPayload;
}
