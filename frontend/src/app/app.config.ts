import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAuth } from './features/auth/infrastructure/di/auth.providers';
import { provideForms } from './features/forms/infrastructure/di/form.provider';
import { authInterceptor } from './features/auth/infrastructure/security/auth.interceptor';
// import { AuthInterceptor } from './features/auth/infrastructure/security/auth.interceptor';

const API_URL = 'http://localhost:3000';

export const appConfig: ApplicationConfig = {
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideAuth(API_URL),
    provideForms(API_URL),
    provideRouter(routes)
  ]
};
