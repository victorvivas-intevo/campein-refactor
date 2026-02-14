import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SESSION_STORE_TOKEN } from '../../application/interfaces/session-store.interface';
import { ToastService } from '@/shared/services/toast/toast.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const sessionStore = inject(SESSION_STORE_TOKEN);
  const router = inject(Router);
  const toast = inject(ToastService);

  // Leemos los roles permitidos que configuraremos en la ruta
  const allowedRoles = route.data['allowedRoles'] as Array<string>;
  const currentRole = sessionStore.getRoleId();

  // Si la ruta tiene roles definidos y el rol actual NO está incluido
  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    toast.error('Acceso Denegado', 'No tienes permisos para ver este módulo.');
    // Lo pateamos al dashboard
    return router.createUrlTree(['/dashboard']);
  }

  return true; // Pasa la validación
};