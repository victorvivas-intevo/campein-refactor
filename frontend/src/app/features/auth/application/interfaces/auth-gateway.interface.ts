import { Observable } from 'rxjs';
import { Session } from '../../domain/entities/session.entity';
import { LoginCredentialsDTO } from '../dtos/login.dto';

export interface AuthGatewayInterface {
  login(credentials: LoginCredentialsDTO): Observable<Session>;
  refresh(refreshToken: string): Observable<Session>;
  me(accessToken: string): Observable<Session>; // opcional, pero útil
}
