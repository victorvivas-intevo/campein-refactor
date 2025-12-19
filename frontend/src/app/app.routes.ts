// app.routes.ts
import { Routes } from '@angular/router';

import { Auth as AuthLayoutComponent } from '@/shared/ui/layout/auth/auth';
import { Private as PrivateLayoutComponent } from '@/shared/ui/layout/private/private';
import { Public as PublicLayoutComponent } from '@/shared/ui/layout/public/public';

export const routes: Routes = [
  {
    // Layout público por defecto
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'public-form/voluntario-publico',
      },
      {
        path: 'public-form/:code',
        loadComponent: () =>
          import('@/features/public-form/ui/public-form.page/public-form.page').then(
            (m) => m.PublicFormPage,
          ),
      },
    ],
  },
  {
    // Layout de autenticación
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@/features/auth/ui/login.page/login.page').then(
            (m) => m.LoginPage,
          ),
      },
      // Más rutas de auth en el futuro: reset-password, email-verified, etc.
    ],
  },
  {
    // Layout privado (ya autenticado)
    path: 'app',
    component: PrivateLayoutComponent,
    children: [
      // Aquí irán dashboard, módulos, etc.
      // { path: 'dashboard', loadComponent: () => import(...).then(m => m.DashboardPageComponent) }
    ],
  },
  {
    path: '**',
    redirectTo: 'public-form/voluntario-publico',
  },
];
