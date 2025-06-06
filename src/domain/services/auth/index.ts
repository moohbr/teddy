import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthServiceInterface } from './interfaces';
import { TokenPayload } from './types';

export class AuthService implements AuthServiceInterface {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = '1h';
  }

  public async hashPassword(raw: string): Promise<string> {
    return bcrypt.hash(raw, 10);
  }

  public async comparePassword(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }

  public generateToken(user: TokenPayload['user']): string {
    return jwt.sign({ user }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
  }

  public verifyToken(token: string): TokenPayload {
    const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
    return decoded;
  }
}
