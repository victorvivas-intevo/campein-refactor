import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { PublicFormsGatewayInterface } from '../../domain/repositories/public-forms.query.interface';
import { PublicFormsDto } from '../../domain/dtos/query.dtos';


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

}