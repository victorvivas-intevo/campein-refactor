import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '../../application/fecades/auth.fecade';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('AuthInterceptor invoked for request:', req.url);
  const auth = inject(AuthFacade);
  const token = auth.getAccessToken();
  console.log('AuthInterceptor token:', token);

  const isPublic = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

  if (!token || isPublic) return next(req);

  return next(req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};
