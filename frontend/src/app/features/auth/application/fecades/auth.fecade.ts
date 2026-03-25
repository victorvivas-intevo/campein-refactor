import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { LoginCredentialsDTO } from '../dtos/login.dto';
import { LoginUseCase } from '../use-cases/login.service';
import { LogoutUseCase } from '../use-cases/logout.service';
import { LoadSessionUseCase } from '../use-cases/load-session.service';
import { RefreshTokenUseCase } from '../use-cases/refresh-token.service';
import { Session } from '../../domain/entities/session.entity';
import { Router } from '@angular/router';
import { ToastService } from '@/shared/services/toast/toast.service';
import { getRoleDisplayName } from '../../domain/value-objects/role.dictionary';

@Injectable()
export class AuthFacade {
  private readonly _session = signal<Session | null>(null);
  private readonly _loading = signal(false);

  private toast = inject(ToastService);

  readonly session = this._session.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => !!this._session()?.tokens?.accessToken);

  readonly currentDisplayRole = computed(() => {
    const currentRole = this.session()?.user?.role;
    if (!currentRole) return 'Cargando...'; // O 'Sin rol'
    
    return getRoleDisplayName(currentRole);
  });

  constructor(
    private readonly loginUC: LoginUseCase,
    private readonly logoutUC: LogoutUseCase,
    private readonly loadSessionUC: LoadSessionUseCase,
    private readonly refreshUC: RefreshTokenUseCase,
    private readonly router: Router
  ) {
    // hidratar sesión al iniciar
    this._session.set(this.loadSessionUC.execute());
  }

  getAccessToken(): string | null {
    return this._session()?.tokens.accessToken ?? null;
  }

  login(dto: LoginCredentialsDTO): Observable<Session> {
    this._loading.set(true);
    // console.log("auth.fecade.ts login method called")
    return this.loginUC.execute(dto).pipe(
      tap(session => this._session.set(session)),
      finalize(() => this._loading.set(false))
    );
  }

  logout(): void {
    this.logoutUC.execute();
    this._session.set(null);
  }

  refresh(): Observable<Session> {
    return this.refreshUC.execute().pipe(
      tap(session => this._session.set(session))
    );
  }

  handleUnauthorized(): void {
    this.logout();
    this.router.navigate(['/auth/login']);
  }
}
