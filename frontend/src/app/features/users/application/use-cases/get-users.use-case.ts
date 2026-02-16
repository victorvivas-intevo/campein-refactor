import { map, Observable, throwError } from 'rxjs';
// import { GetFormDTO } from "../../domain/dtos/form-list.dto";
import { UserGatewayInterface } from '../../domain/repositories/user-gateway.interface';
import { inject } from '@angular/core';
import { SESSION_STORE_TOKEN } from '@/features/auth/application/interfaces/session-store.interface';
import { UserResponseDto } from '../../domain/dtos/user.dto';
import { UnauthorizedRoleError } from '../../domain/errors/unauthorized-role.error';

export class GetUsersUseCase {
  private sessionStore = inject(SESSION_STORE_TOKEN);
  constructor(private readonly gateway: UserGatewayInterface) {}

  execute(): Observable<UserResponseDto[]> {
    const currentRole = this.sessionStore.getRoleId();
    if (currentRole === 'LIDER_BETA') {
      return throwError(
        () => new UnauthorizedRoleError('Los líderes Beta no tienen acceso a esta vista.'),
      );
    }
    return this.gateway.getUsers().pipe(
      map((users: UserResponseDto[]) => {
        return users.map((user) => ({
          ...user,
          campain: user.tenant?.name || 'Sin campaña asignada',
        }));
      }),
    );
  }
}
