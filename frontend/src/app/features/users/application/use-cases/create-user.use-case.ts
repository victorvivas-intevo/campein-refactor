import { Injectable, inject } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { UserManagementInterface } from '../../domain/repositories/user-manegement.interface';
import { CreateUserDto, UserResponseDto } from '../../domain/dtos/user.dto';
import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';
import { UnauthorizedRoleError } from '../../domain/errors/unauthorized-role.error';
import { User } from '@/features/auth/domain/entities/user.entity';


@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly gateway: UserManagementInterface,
    private readonly authFacade: AuthFacade
  ) {}

  execute(userData: CreateUserDto): Observable<UserResponseDto> {
    const currentUser = this.authFacade.session()?.user;
    
    if (!currentUser) {
      this.authFacade.handleUnauthorized();
      throw new Error('Usuario no autenticado');
    }

    if (currentUser?.role === 'LIDER_ALFA' && userData.role !== 'LIDER_BETA') {
      return throwError(() => new UnauthorizedRoleError('Un Líder Alfa solo puede crear Líderes Beta.'));
    }

    if (currentUser?.role !== 'ADMIN_SISTEMA') {
      userData.tenantId = currentUser.tenantId; // Garantizar que no se asigne a otra campaña
    }

    const sanitizedData = {
      ...userData,
      email: userData.email.trim().toLowerCase(),
      fullName: userData.fullName ? this.capitalizeName(userData.fullName) : null,
    };

    return this.gateway.createUser(sanitizedData)
  }

  private capitalizeName(name: string): string {
    return name.replace(/\b\w/g, l => l.toUpperCase());
  }
}
