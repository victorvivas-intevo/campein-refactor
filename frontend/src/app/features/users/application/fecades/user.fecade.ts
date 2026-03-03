import { Injectable, signal, inject } from '@angular/core';
import { catchError, EMPTY, firstValueFrom } from 'rxjs';
import { GetUsersUseCase } from '../use-cases/get-users.use-case';
import { CreateUserDto, UserResponseDto } from '../../domain/dtos/user.dto';
import { UnauthorizedRoleError } from '../../domain/errors/unauthorized-role.error';
import { ToastService } from '@/shared/services/toast/toast.service';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { User } from '@/features/auth/domain/entities/user.entity';
// import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from '../../domain/dtos/form-list.dto';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private getUsersUC = inject(GetUsersUseCase);
  private createUserUC = inject(CreateUserUseCase);
  private router = inject(Router);

  items = signal<UserResponseDto[]>([]);
  current = signal<UserResponseDto | null>(null);
  createdUser = signal<UserResponseDto | null>(null);
  loading = signal(false);

  private toast = inject(ToastService);

  async load() {
    this.loading.set(true);
    try {
      //   const users = await firstValueFrom(this.getUsersUC.execute().pipe());
      await this.getUsersUC
        .execute()
        .pipe(
          catchError((error) => {
            if (error instanceof UnauthorizedRoleError) {
              this.toast.error('Acceso Denegado', error.message);
            } else {
              this.toast.error('Error del servidor, no se logro traer la lista de usuarios');
            }

            return EMPTY;
          }),
        )
        .subscribe((users) => {
          this.items.set(users);
        });
    } finally {
      this.loading.set(false);
    }
  }

  async createUser(userData: CreateUserDto): Promise<boolean> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.createUserUC.execute(userData));
      this.createdUser.set(result)

      this.toast.success('Éxito', 'Usuario creado correctamente');
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedRoleError) {
        this.toast.error('Acceso Denegado', error.message);
      } else if (error instanceof HttpErrorResponse) {
        if (error.status === 409) {
          const backendMessage = error.error.message || 'Ya existe un usuario con ese email.';
          this.toast.error('Conflicto', backendMessage);
        } else if (error.status === 400) {
          const backendMessage = error.error.message || 'El tenantId no existe o es inválido.';
          this.toast.error('Datos Inválidos', backendMessage);
        } else {
          this.toast.error('Error del servidor', 'No se logró crear el usuario');
        }
      } else {
        this.toast.error('Error', 'Ocurrió un error inesperado en la aplicación');
        console.error(error);
      }
      return false;
    } finally {
      this.loading.set(false);
    }
  }
}
