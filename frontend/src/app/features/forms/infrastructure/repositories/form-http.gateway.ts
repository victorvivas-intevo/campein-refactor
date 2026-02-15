import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetFormDTO,
  GetFormSubmissionDTO,
  GetFormVersionDTO,
} from '../../domain/dtos/form-list.dto';
import { FormsGatewayInterface } from '../../domain/repositories/forms-gateway.interface';
import { CreateFormDTO, ResponseCreateFormDTO } from '../../domain/dtos/form-magement.dto';

export const FORM_API_URL = new InjectionToken<string>('FORM_API_URL');

@Injectable()
export class FormHttpGateway implements FormsGatewayInterface {
  constructor(
    private readonly http: HttpClient,
    @Inject(FORM_API_URL) private readonly baseUrl: string,
  ) {}

  // Get Forms
  getFormsByTenantId(tenantId: string): Observable<GetFormDTO[]> {
    return this.http.get<GetFormDTO[]>(`${this.baseUrl}/forms/byTenant/${tenantId}`);
  }
  getFormById(formId: string): Observable<GetFormDTO> {
    return this.http.get<GetFormDTO>(`${this.baseUrl}/forms/byId/${formId}`);
  }
  getFormByCode(code: string): Observable<GetFormDTO> {
    return this.http.get<GetFormDTO>(`${this.baseUrl}/forms/byCode/${code}`);
  }

  getFormsAssigmentUsers(userId: string): Observable<GetFormDTO[]> {
    return this.http.get<GetFormDTO[]>(`${this.baseUrl}/forms/getFormsAssigmentUser/${userId}`);
  }
  // Get schema
  getFormSchema(versionId: string): Observable<GetFormVersionDTO> {
    return this.http.get<GetFormVersionDTO>(`${this.baseUrl}/forms/getSchema/${versionId}`);
  }
  // Get submmitions
  getFormSubmissionById(formId: string, submissionId: string): Observable<GetFormSubmissionDTO> {
    return this.http.get<GetFormSubmissionDTO>(
      `${this.baseUrl}/forms/${formId}/getSubmissions/${submissionId}`,
    );
  }
  // Create Forms
  createForm(formData: CreateFormDTO): Observable<ResponseCreateFormDTO> {
    return this.http.post<any>(`${this.baseUrl}/forms`, formData);
  }
  // Update Forms
  updateForm(formId: string, formData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/forms/${formId}`, formData);
  }
  // Delete Forms
  deleteForm(formId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/forms/${formId}`);
  }
}
