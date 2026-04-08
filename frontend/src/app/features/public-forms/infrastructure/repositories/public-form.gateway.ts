import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { PublicFormsGatewayInterface } from '../../domain/repositories/public-forms.query.interface';
import { PublicFormsDto } from '../../domain/dtos/query.dtos';
import { PublicFormSchemaResponse } from '../../domain/dtos/public-form.dtos';
// import { FormSchema } from '@/shared/ui/form-controls/form-control.types';


export const PUBLIC_FORMS_API_URL = new InjectionToken<string>('PUBLIC_FORMS_API_URL');


@Injectable()
export class PublicFormsGateway implements PublicFormsGatewayInterface {
  constructor(
    private readonly http: HttpClient,
    @Inject(PUBLIC_FORMS_API_URL) private readonly baseUrl: string,
  ) {}

  getFormsByTenantCode(tenantCode: string): Observable<PublicFormsDto[]> {
    return this.http.get<PublicFormsDto[]>(`${this.baseUrl}/public-forms/getFormsByTenant/${tenantCode}`);
  }

  getFormSchema(tenantCode: string, formCode: string): Observable<PublicFormSchemaResponse> {
    return this.http.get<PublicFormSchemaResponse>(`${this.baseUrl}/public-forms/getFormSchema/${tenantCode}/${formCode}`);
  }

  submitForm(tenantCode: string, formCode: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/public-forms/submissions/${tenantCode}/${formCode}`, data);
  }

}