import { Routes } from '@angular/router';

export const PublicFormsRoutes: Routes = [
  {
    path: ':codeTenant',
    loadComponent: () =>
      import('@/features/public-forms/presentation/pages/list-forms.page/list-forms.page').then((m) => m.ListFormsPage),
  },
  {
    path: ':codeTenant/:codeForm',
    loadComponent: () =>
      import('@/features/public-forms/presentation/pages/public-form.page/public-form.page').then((m) => m.PublicFormPage),
  },
  {
    path: '**',
    redirectTo: 'paloma-valencia',
  },
];