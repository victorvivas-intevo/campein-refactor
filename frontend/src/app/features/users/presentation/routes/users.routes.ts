import { Routes } from '@angular/router';

const path: string = 'users';

export const usersRoutes: Routes = [
  {
    path: `${path}`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/users.page/users.page').then((m) => m.UsersPage),
  },
  {
    path: `${path}/create`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/create-user.page/create-user.page').then((m) => m.CreateUserPage),
  },
  {
    path: `${path}/viewUser/:id`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/view-user.page/view-user.page').then((m) => m.ViewUserPage),
  },
  {
    path: `profile`,
    loadComponent: () =>
      import('@/features/users/presentation/pages/profile.page/profile.page').then((m) => m.ProfilePage),
  }
];