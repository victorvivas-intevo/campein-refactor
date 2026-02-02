import { Routes } from '@angular/router';

export const notificationRoutes: Routes = [
  {
    path: 'notifications',
    loadComponent: () =>
      import('@/features/notifications/presentation/pages/principal/principal').then((m) => m.Principal),
  },
];