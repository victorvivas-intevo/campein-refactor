import { Observable, tap } from 'rxjs';
import { LoginCredentialsDTO } from '../dtos/login.dto';
import { AuthGatewayInterface } from '../interfaces/auth-gateway.interface';
import { SessionStoreInterface } from '../interfaces/session-store.interface';
import { Session } from '../../domain/entities/session.entity';

export class LoginUseCase {
  constructor(
    private readonly gateway: AuthGatewayInterface,
    private readonly store: SessionStoreInterface
  ) {}

  execute(credentials: LoginCredentialsDTO): Observable<Session> {
    console.log("login.service.ts execute method called")
    return this.gateway.login(credentials).pipe(
      tap(session => this.store.save(session))
    );
  }
}
