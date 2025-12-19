import * as crypto from 'crypto';

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateRefreshToken() {
  return crypto.randomBytes(48).toString('hex');
}