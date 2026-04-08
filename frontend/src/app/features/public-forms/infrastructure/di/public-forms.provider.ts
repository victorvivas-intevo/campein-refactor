import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { PUBLIC_FORMS_API_URL, PublicFormsGateway } from '../repositories/public-form.gateway';
import { PublicFormsFacade } from '../../application/facades/public-form.fecade';
import { GetFormsByTenantUseCase } from '../../application/use-cases/get-forms-by-tenant.use-case';
import { GetFormSchemaUseCase } from '../../application/use-cases/get-form-schema.use-case';
import { SubmitFormUseCase } from '../../application/use-cases/submission-form.use-case';

export function providePublicForms(publicFormsApiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    PublicFormsGateway,
    // TODO: agregar más casos de uso y repositorios a medida que se vayan creando
    { provide: GetFormsByTenantUseCase, useFactory: (gateway: PublicFormsGateway) => new GetFormsByTenantUseCase(gateway), deps: [PublicFormsGateway] },
    { provide: GetFormSchemaUseCase, useFactory: (gateway: PublicFormsGateway) => new GetFormSchemaUseCase(gateway), deps: [PublicFormsGateway] },
    { provide: SubmitFormUseCase, useFactory: (gateway: PublicFormsGateway) => new SubmitFormUseCase(gateway), deps: [PublicFormsGateway] },

    PublicFormsFacade,
    { provide: PUBLIC_FORMS_API_URL, useValue: publicFormsApiUrl },
  ]);
}
