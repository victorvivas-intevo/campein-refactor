import { AuthTokens } from '../value-objects/auth-tokens.vo';
import { User } from './user.entity';

export class Session {
  constructor(
    public readonly user: User,
    public readonly tokens: AuthTokens,
    public readonly accessTokenExpiresAt?: Date
  ) {}

  isExpired(now: Date = new Date()): boolean {
    if (!this.accessTokenExpiresAt) return false; // si no tienes exp, no forzamos expiración
    return now.getTime() >= this.accessTokenExpiresAt.getTime();
  }
}
