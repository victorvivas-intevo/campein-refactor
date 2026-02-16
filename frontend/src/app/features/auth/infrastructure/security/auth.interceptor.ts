import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '../../application/fecades/auth.fecade';
import { ToastService } from '@/shared/services/toast/toast.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthFacade);
  const toast = inject(ToastService);
  const token = auth.getAccessToken();

  const isPublic = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

  let authReq = req;
  if (token && !isPublic) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Detectar error 401 Unauthorized
      if (error.status === 401 && !isPublic) {
        toast.info(
          'Sesión expirada', 
          'Su sesión ha vencido. Será redirigido al inicio de sesión.'
        );
        
        auth.handleUnauthorized();
      }
      return throwError(() => error);
    })
  );
};
