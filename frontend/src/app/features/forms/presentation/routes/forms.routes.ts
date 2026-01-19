import { Routes } from '@angular/router';

export const formsRoutes: Routes = [
  {
    path: 'forms',
    loadComponent: () =>
      import('@/features/forms/presentation/pages/forms.page/forms.page').then((m) => m.FormsPage),
  },
  {
    path: 'forms/view-schema/:codeForm/:codeVersion',
    loadComponent: () =>
      import('@/features/forms/presentation/pages/view-schema.page/view-schema.page').then((m) => m.ViewSchemaPage),
  },
  {
    path: 'forms/create-form',
    loadComponent: () =>
      import('@/features/forms/presentation/pages/create-forms.page/create-forms.page').then((m) => m.CreateFormsPage),
  },
  {
    path: 'forms/update-form/:code',
    loadComponent: () =>
      import('@/features/forms/presentation/pages/update-forms.page/update-forms.page').then((m) => m.UpdateFormsPage),
  },
];