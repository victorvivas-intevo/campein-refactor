import { Observable, tap, throwError } from 'rxjs';
import { AuthGatewayInterface } from '../interfaces/auth-gateway.interface';
import { SessionStoreInterface } from '../interfaces/session-store.interface';
import { SessionExpiredError } from '../../domain/errors/session-expired.error';
import { Session } from '../../domain/entities/session.entity';

export class RefreshTokenUseCase {
  constructor(
    private readonly gateway: AuthGatewayInterface,
    private readonly store: SessionStoreInterface
  ) {}

  execute(): Observable<Session> {
    const current = this.store.load();

    const refreshToken = current?.tokens.refreshToken;
    if (!refreshToken) return throwError(() => new SessionExpiredError('No refresh token'));

    return this.gateway.refresh(refreshToken).pipe(
      tap(session => this.store.save(session))
    );
  }
}
