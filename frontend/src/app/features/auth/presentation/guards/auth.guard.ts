import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from '../../application/fecades/auth.fecade';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;

  console.log('No autenticado, redirigiendo al login');
  router.navigateByUrl('/auth/login');
  return false;
};
