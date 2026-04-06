import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { PUBLIC_FORMS_API_URL, PublicFormsGateway } from '../repositories/public-form.gateway';
import { PublicFormsFacade } from '../../application/facades/PublicForm.fecade';
import { GetFormsByTenantUseCase } from '../../application/use-cases/getFormsByTenant.use-case';

export function providePublicForms(publicFormsApiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    PublicFormsGateway,
    // TODO: agregar más casos de uso y repositorios a medida que se vayan creando
    { provide: GetFormsByTenantUseCase, useFactory: (gateway: PublicFormsGateway) => new GetFormsByTenantUseCase(gateway), deps: [PublicFormsGateway] },

    PublicFormsFacade,
    { provide: PUBLIC_FORMS_API_URL, useValue: publicFormsApiUrl },
  ]);
}
