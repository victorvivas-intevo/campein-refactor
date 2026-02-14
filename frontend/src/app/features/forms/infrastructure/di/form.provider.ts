import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { FormFacade } from "../../application/fecades/form.fecade";
import { GetFormUseCase } from "../../application/use-cases/get-form.use-case";
import { FormHttpGateway, FORM_API_URL } from "../repositories/form-http.gateway";
import { GetFormsUseCase } from "../../application/use-cases/get-forms.use-case";
import { GetFormSchemaUseCase } from "../../application/use-cases/get-form-submissions.use-case";
import { GetFormSubmissionUseCase } from "../../application/use-cases/get-form-submission.use-case";

export function provideForms(formApiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([

    FormHttpGateway,

    { provide: GetFormUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormUseCase(gateway), deps: [FormHttpGateway] },
    { provide: GetFormsUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormsUseCase(gateway), deps: [FormHttpGateway] },
    { provide: GetFormSchemaUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormSchemaUseCase(gateway), deps: [FormHttpGateway] },
    { provide: GetFormSubmissionUseCase, useFactory: (gateway: FormHttpGateway) => new GetFormSubmissionUseCase(gateway), deps: [FormHttpGateway] },

    // Facade
    FormFacade,
    // API URL
    { provide: FORM_API_URL, useValue: formApiUrl },
  ]);
};