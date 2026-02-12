import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { routes } from './app.routes';
import { provideAuth } from './features/auth/infrastructure/di/auth.providers';
import { provideForms } from './features/forms/infrastructure/di/form.provider';
import { authInterceptor } from './features/auth/infrastructure/security/auth.interceptor';
import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;

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
