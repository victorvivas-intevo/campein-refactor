import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '@/shared/services/toast/toast.service';
import { AuthFacade } from '../../application/fecades/auth.fecade';

export const roleGuard: CanActivateFn = (route, state) => {
  const sessionStore = inject(AuthFacade);
  const router = inject(Router);
  const toast = inject(ToastService);

  // Leemos los roles permitidos que configuraremos en la ruta
  const allowedRoles = route.data['allowedRoles'] as Array<string>;
  const currentRole = sessionStore.session()?.user.role;

  if(!currentRole) {
    toast.error('Acceso Denegado', 'No tienes permisos para ver este módulo.');
    return router.createUrlTree(['/login']);
  }

  // Si la ruta tiene roles definidos y el rol actual NO está incluido
  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    toast.error('Acceso Denegado', 'No tienes permisos para ver este módulo.');
    // Lo pateamos al dashboard
    return router.createUrlTree(['/dashboard']);
  }

  return true; // Pasa la validación
};