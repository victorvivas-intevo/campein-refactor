import { map, Observable, throwError } from 'rxjs';
import { UserQueryInterface } from '../../domain/repositories/user-query.interface';
import { inject, Injectable } from '@angular/core';
import { UserResponseDto } from '../../domain/dtos/user.dto';
import { UnauthorizedRoleError } from '../../domain/errors/unauthorized-role.error';
import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';

@Injectable()
export class GetUsersToAssignmentUseCase {
  private authFecade = inject(AuthFacade);
  constructor(private readonly gateway: UserQueryInterface) {}

  execute(caseType: string, tenantId?: string): Observable<UserResponseDto[]> {
    const currentRole = this.authFecade.session()?.user.role;
    if (!currentRole || currentRole === '') {
      this.authFecade.logout();
      throwError(
        () => new UnauthorizedRoleError('Debe existir un rol válido.'),
      );
    }

    if (currentRole === 'LIDER_BETA') {
      return throwError(
        () => new UnauthorizedRoleError('Los líderes Beta no tienen acceso a esta vista.'),
      );
    }

    if(currentRole !== 'ADMIN_SISTEMA') {
      tenantId = this.authFecade.session()?.user.tenantId;
    }

    if(tenantId === undefined){
      tenantId = this.authFecade.session()?.user.tenantId;
    }
    tenantId = this.authFecade.session()?.user.tenantId ?? '';

    return this.gateway.getUsersToAssignment(caseType, tenantId).pipe(
      map((users: UserResponseDto[]) => {
        return users.map((user) => ({
          ...user,
          campain: user.tenant?.name || 'Sin campaña asignada',
        }));
      }),
    );
  }
}
