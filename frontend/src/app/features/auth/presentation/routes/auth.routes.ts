import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@/features/auth/presentation/pages/login.page/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'recover',
    loadComponent: () =>
      import('@/features/auth/presentation/pages/recover.page/recover.page').then((m) => m.RecoverPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  // Más rutas de auth en el futuro: reset-password, email-verified, etc.
];
