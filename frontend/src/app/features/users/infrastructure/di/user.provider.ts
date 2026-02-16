import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { USER_API_URL, UserApiClient } from "../repositories/user-http.gateway";
import { UsersFacade } from "../../application/fecades/user.fecade";
import { GetUsersUseCase } from "../../application/use-cases/get-users.use-case";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
// import { UserManagementInterface } from "../../domain/repositories/user-manegement.interface";
// import { UserQueryInterface } from "../../domain/repositories/user-query.interface";

export function provideUsers(userApiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([

    UserApiClient,
    { provide: USER_API_URL, useValue: userApiUrl },

    // { provide: UserManagementInterface, useClass: UserApiClient },
    // { provide: UserQueryInterface, useClass: UserApiClient },

    { provide: GetUsersUseCase, useFactory: (gateway: UserApiClient) => new GetUsersUseCase(gateway), deps: [UserApiClient] },
    { provide: CreateUserUseCase, useFactory: (gateway: UserApiClient) => new CreateUserUseCase(gateway), deps: [UserApiClient] },
    // { provide: GetFormsUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormsUseCase(gateway), deps: [FormHttpGateway] },
    // { provide: GetFormSchemaUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormSchemaUseCase(gateway), deps: [FormHttpGateway] },
    // { provide: GetFormSubmissionUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormSubmissionUseCase(gateway), deps: [FormHttpGateway] },


    // Facade
    UsersFacade,
    

  ]);
};