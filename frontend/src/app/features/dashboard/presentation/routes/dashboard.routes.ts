import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@/features/dashboard/presentation/pages/dashboard.page/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('@/shared/ui/components/mapa-1/mapa-1').then((m) => m.Mapa1),
  },
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
];