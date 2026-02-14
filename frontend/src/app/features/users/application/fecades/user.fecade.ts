import { Injectable, signal, inject } from '@angular/core';
import { catchError, EMPTY, firstValueFrom } from 'rxjs';
import { GetUsersUseCase } from '../use-cases/get-users.use-case';
import { UserResponseDto } from '../../domain/dtos/user.dto';
import { UnauthorizedRoleError } from '../../domain/errors/unauthorized-role.error';
import { ToastService } from '@/shared/services/toast/toast.service';
// import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from '../../domain/dtos/form-list.dto';

@Injectable({ providedIn: 'root' })
export class UsersFacade {

  private getUsersUC = inject(GetUsersUseCase);

  items = signal<UserResponseDto[]>([]);
  current = signal<UserResponseDto | null>(null);
  loading = signal(false);

  private toast = inject(ToastService);

  async load() {
    this.loading.set(true);
    try {
    //   const users = await firstValueFrom(this.getUsersUC.execute().pipe());
      await this.getUsersUC.execute().pipe(
        catchError((error) => {
            if (error instanceof UnauthorizedRoleError) {
                this.toast.error('Acceso Denegado', error.message);
            } else {
                this.toast.error('Error del servidor, no se logro traer la lista de usuarios');
            }

            return EMPTY; 
            })
      ).subscribe(users => {
        this.items.set(users);
      });
    } finally {
      this.loading.set(false);
    }
  }
}
