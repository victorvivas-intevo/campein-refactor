import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { AuthFacade } from '../../application/fecades/auth.fecade';
import { LoginUseCase } from '../../application/use-cases/login.service';
import { LogoutUseCase } from '../../application/use-cases/logout.service';
import { LoadSessionUseCase } from '../../application/use-cases/load-session.service';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.service';

import { AuthApiClient, AUTH_API_URL } from '../http/auth-api.client';
import { AuthHttpGateway } from '../repositories/auth-http.gateway';
import { LocalSessionStore } from '../storage/local-session.storage';
import { JwtTokenDecoder } from '../security/jwt-token.decoder';
// import { AuthInterceptor } from '../security/auth.interceptor';
import { SESSION_STORE_TOKEN } from '../../application/interfaces/session-store.interface';

export function provideAuth(authApiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: SESSION_STORE_TOKEN, useValue: new LocalSessionStore() },
    { provide: AUTH_API_URL, useValue: authApiUrl },

    // Infrastructure
    AuthApiClient,
    AuthHttpGateway,
    LocalSessionStore,
    JwtTokenDecoder,

    // Use cases (wiring manual para mantenerlos como clases puras)
    {
      provide: LoginUseCase,
      useFactory: (gateway: AuthHttpGateway, store: LocalSessionStore) =>
        new LoginUseCase(gateway, store),
      deps: [AuthHttpGateway, LocalSessionStore],
    },
    { provide: LogoutUseCase, useFactory: (store: LocalSessionStore) => new LogoutUseCase(store), deps: [LocalSessionStore] },
    { provide: LoadSessionUseCase, useFactory: (store: LocalSessionStore) => new LoadSessionUseCase(store), deps: [LocalSessionStore] },
    {
      provide: RefreshTokenUseCase,
      useFactory: (gateway: AuthHttpGateway, store: LocalSessionStore) =>
        new RefreshTokenUseCase(gateway, store),
      deps: [AuthHttpGateway, LocalSessionStore],
    },

    // Facade
    AuthFacade,

    // Interceptor
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // provideHttpClient(withInterceptorsFromDi()),

  ]);
}
