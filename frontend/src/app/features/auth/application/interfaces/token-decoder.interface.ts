export interface JwtClaims {
  id?: string;
  tenantId?: string;
  email?: string;
  fullName?: string;
  role?: string;
  sessionId?: string;
  exp?: Date | number;
  [key: string]: unknown;
}

export interface TokenDecoderInterface {
  decode<T extends object = JwtClaims>(token: string): T | null;
  getExpiresAt(token: string): Date | null;
}
