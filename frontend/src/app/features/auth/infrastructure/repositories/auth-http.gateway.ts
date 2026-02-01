import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { AuthGatewayInterface } from '../../application/interfaces/auth-gateway.interface';
import { LoginCredentialsDTO } from '../../application/dtos/login.dto';
import { AuthApiClient } from '../http/auth-api.client';
import { JwtTokenDecoder } from '../security/jwt-token.decoder';
import { Session } from '../../domain/entities/session.entity';
import { User } from '../../domain/entities/user.entity';
import { AuthTokens } from '../../domain/value-objects/auth-tokens.vo';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import { JwtClaims } from '../../application/interfaces/token-decoder.interface';

@Injectable()
export class AuthHttpGateway implements AuthGatewayInterface {
  constructor(private readonly api: AuthApiClient, private readonly decoder: JwtTokenDecoder) {}

  login(credentials: LoginCredentialsDTO): Observable<Session> {
    console.log("auth-http.gateway.ts login method called");
    return this.api.login(credentials).pipe(
      map((res) => this.mapToSession(res))
    );
  }

  refresh(refreshToken: string): Observable<Session> {
    if (!refreshToken)
      return throwError(() => new InvalidCredentialsError('Missing refresh token'));

    return this.api.refresh({ refreshToken }).pipe(map((res) => this.mapToSession(res)));
  }

  me(accessToken: string): Observable<Session> {
    return this.api.me(accessToken).pipe(
      map((res) => {
        const expiresAt = this.decoder.getExpiresAt(accessToken) ?? undefined;
        const user = new User(res.user.id, res.user.email, res.user.name!, res.user.role ?? 'User');
        const tokens = new AuthTokens(accessToken);
        return new Session(user, tokens, expiresAt);
      })
    );
  }

  private mapToSession(res: { accessToken: string; refresh_token?: string }): Session {
    // const user = new User(res.user.id, res.user.email, res.user.name, res.user.roles ?? []);
    console.log(res.accessToken)
    const claims = this.decoder.decode<JwtClaims>(res.accessToken);

    console.log(claims)
    // Define aquí los claim-names reales de tu token:
    const id = (claims?.id as string) ?? (claims?.['id'] as string) ?? '';
    const tenantId = (claims?.tenantId as string) ?? (claims?.['tenantId'] as string) ?? '';
    const email = (claims?.email as string) ?? (claims?.['email'] as string) ?? '';
    const name = (claims?.fullName as string) ?? (claims?.['fullName'] as string) ?? undefined;
    const role = (claims?.role as string) ?? (claims?.['rol'] as string) ?? 'USER';

    // Si tu token no trae id/email, no hay forma confiable de construir User.
    // En ese caso, necesitas un endpoint /me o que el backend incluya esos claims.
    if (!id || !email) {
      // Puedes decidir: tirar error o crear un user mínimo.
      // Yo prefiero fallar para que lo notes rápido en dev:
      throw new Error('JWT missing required claims: sub and/or email');
    }

    const user = new User(id, tenantId, email, role, name);
    const tokens = new AuthTokens(res.accessToken, res.refresh_token);
    const expiresAt = this.decoder.getExpiresAt(res.accessToken) ?? undefined;
    return new Session(user, tokens, expiresAt);
  }
}
