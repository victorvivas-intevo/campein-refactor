import { roleGuard } from '@/features/auth/presentation/guards/role.guard';
import { Routes } from '@angular/router';

const priviliges: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA'];

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
  {
    path: 'analytical/paloma-valencia',
    loadComponent: () =>
      import('../pages/paloma-valencia.page/paloma-valencia.page').then((m) => m.PalomaValenciaPage),
      canActivate: [roleGuard],
      data: {
        allowedRoles: priviliges,
      },
  },
  {
    path: 'analytical/social-network-comparative',
    loadComponent: () =>
      import('../pages/comparative-social-network.page/comparative-social-network.page').then((m) => m.ComparativeSocialNetworkPage),
      canActivate: [roleGuard],
      data: {
        allowedRoles: priviliges,
      },
  },
  {
    path: 'analytical/survies-comparative',
    loadComponent: () =>
      import('../pages/comparative-survies.page/comparative-survies.page').then((m) => m.ComparativeSurviesPage),
      canActivate: [roleGuard],
      data: {
        allowedRoles: priviliges,
      },
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