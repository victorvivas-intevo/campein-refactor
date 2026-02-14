import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { USER_API_URL, UserApiClient } from "../repositories/user-http.gateway";

export function provideUsers(userApiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([

    UserApiClient,
    { provide: USER_API_URL, useValue: userApiUrl },

    // { provide: GetFormUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormUseCase(gateway), deps: [FormHttpGateway] },
    // { provide: GetFormsUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormsUseCase(gateway), deps: [FormHttpGateway] },
    // { provide: GetFormSchemaUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormSchemaUseCase(gateway), deps: [FormHttpGateway] },
    // { provide: GetFormSubmissionUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormSubmissionUseCase(gateway), deps: [FormHttpGateway] },
    
    // Facade
    // UserFacade,
    

  ]);
};