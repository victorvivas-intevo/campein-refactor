import { map, Observable, throwError } from 'rxjs';
import { UserQueryInterface } from '../../domain/repositories/user-query.interface';
import { inject, Injectable } from '@angular/core';
import { UserResponseDto } from '../../domain/dtos/user.dto';
import { UnauthorizedRoleError } from '../../domain/errors/unauthorized-role.error';
import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';

@Injectable()
export class GetUsersUseCase {
  private authFecade = inject(AuthFacade);
  constructor(private readonly gateway: UserQueryInterface) {}

  execute(): Observable<UserResponseDto[]> {
    const currentRole = this.authFecade.session()?.user.role;
    if (!currentRole || currentRole === '') {
      this.authFecade.logout();
      throwError(
        () => new UnauthorizedRoleError('Los líderes Beta no tienen acceso a esta vista.'),
      );
    }
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
