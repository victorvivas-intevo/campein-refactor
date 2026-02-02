import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@/features/dashboard/presentation/pages/dashboard.page/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'election-statistics',
    loadComponent: () =>
      import('@/shared/ui/components/election-statistics/election-statistics').then((m) => m.ElectionStatistics),
  },
  {
    path: 'fico-volunteers',
    loadComponent: () =>
      import('@/shared/ui/components/fico-volunteers/fico-volunteers').then((m) => m.FicoVolunteers),
  },
  {
    path: 'duque-volunteers',
    loadComponent: () =>
      import('@/shared/ui/components/heat-map/heat-map').then((m) => m.HeatMap),
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // }
];