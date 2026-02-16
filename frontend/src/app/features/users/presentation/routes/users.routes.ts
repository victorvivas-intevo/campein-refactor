import { roleGuard } from '@/features/auth/presentation/guards/role.guard';
import { Routes } from '@angular/router';

const path: string = 'users';

const priviliges: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA', 'LIDER_ALFA'];

export const usersRoutes: Routes = [
  {
    path: `${path}`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/users.page/users.page').then((m) => m.UsersPage),
    canActivate: [roleGuard],
    data: {
      allowedRoles: priviliges,
    },
  },
  {
    path: `${path}/create`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/create-user.page/create-user.page').then(
        (m) => m.CreateUserPage,
      ),
    canActivate: [roleGuard],
    data: {
      allowedRoles: priviliges,
    },
  },
  {
    path: `${path}/viewUser/:id`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/view-user.page/view-user.page').then(
        (m) => m.ViewUserPage,
      ),
    canActivate: [roleGuard],
    data: {
      allowedRoles: priviliges,
    },
  },
  {
    path: `profile`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/profile.page/profile.page').then(
        (m) => m.ProfilePage,
      ),
  },
];
