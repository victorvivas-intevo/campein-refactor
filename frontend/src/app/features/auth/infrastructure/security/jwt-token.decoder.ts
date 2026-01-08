import { Injectable } from '@angular/core';
import { JwtClaims, TokenDecoderInterface } from '../../application/interfaces/token-decoder.interface';

@Injectable()
export class JwtTokenDecoder implements TokenDecoderInterface {
  decode<T extends object = JwtClaims>(token: string): T | null {
    try {
      const [, payload] = token.split('.');
      if (!payload) return null;

      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  getExpiresAt(token: string): Date | null {
    const claims = this.decode<JwtClaims>(token);
    const exp = claims?.exp;
    if (typeof exp !== 'number') return null;
    return new Date(exp * 1000);
  }
}
