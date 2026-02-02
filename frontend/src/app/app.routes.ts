// app.routes.ts
import { Routes } from '@angular/router';

import { Auth as AuthLayoutComponent } from '@/shared/ui/layout/auth/auth';
import { Private as PrivateLayoutComponent } from '@/shared/ui/layout/private/private';
import { Public as PublicLayoutComponent } from '@/shared/ui/layout/public/public';

import { authRoutes } from '@/features/auth/presentation/routes/auth.routes';
import { authGuard } from './features/auth/presentation/guards/auth.guard';
import { formsRoutes } from './features/forms/presentation/routes/forms.routes';
import { dashboardRoutes } from './features/dashboard/presentation/routes/dashboard.routes';
import { notificationRoutes } from './features/notifications/presentation/routes/notifications.routes';

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
    children: authRoutes
  },
  {
    // Layout privado (ya autenticado)
    path: 'app',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],
    children: [...formsRoutes, ...dashboardRoutes, ...notificationRoutes, 
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ],
    pathMatch: 'prefix',
  },
  {
    path: '**',
    redirectTo: 'public-form/voluntario-publico',
  },
];
