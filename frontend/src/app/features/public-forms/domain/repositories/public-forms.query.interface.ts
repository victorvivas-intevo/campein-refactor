import { Observable } from 'rxjs';
import { PublicFormsDto } from '../dtos/query.dtos';
import { PublicFormSchemaResponse, PublicFormSubmissionResponse } from '../dtos/public-form.dtos';

export interface PublicFormsGatewayInterface {
  getFormsByTenantCode(tenantCode: string): Observable<PublicFormsDto[]>;
  getFormSchema(tenantCode: string, formCode: string): Observable<PublicFormSchemaResponse>;
  submitForm(tenantCode: string, formCode: string, data: any): Observable<PublicFormSubmissionResponse>;
}
