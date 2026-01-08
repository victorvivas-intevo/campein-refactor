import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from '../../domain/dtos/form-list.dto';

export const FORM_API_URL = new InjectionToken<string>('FORM_API_URL');

@Injectable()
export class FormsApiClient {
  // private readonly http: HttpClient;

  constructor(private readonly http: HttpClient, 
    @Inject(FORM_API_URL) private readonly baseUrl: string) {
    // this.http = new HttpClient(httpBackend);
  }

  // Get list of forms by tenant 
  getFormsByTenantId(tenantId: string): Observable<GetFormDTO[]> {
    return this.http.get<GetFormDTO[]>(`${this.baseUrl}/forms/byTenant/${tenantId}`);
  }
  
  // Get form by id 
  getFormById(formId: string): Observable<GetFormDTO>{
    return this.http.get<GetFormDTO>(`${this.baseUrl}/forms/byId/${formId}`);
  };

  getFormByCode(code: string): Observable<GetFormDTO>{
    return this.http.get<GetFormDTO>(`${this.baseUrl}/forms/byCode/${code}`);
  };
  
  // Get submissions
  getFormSchema(formId: string): Observable<GetFormVersionDTO>{
    return this.http.get<GetFormVersionDTO>(`${this.baseUrl}/forms/${formId}/getSubmissions`);
  };
  
  getFormSubmissionById(formId: string, submissionId: string): Observable<GetFormSubmissionDTO>{
    return this.http.get<GetFormSubmissionDTO>(`${this.baseUrl}/forms/${formId}/getSubmissions/${submissionId}`);
  };
  
  // Create Forms
  createForm(formData: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/forms`, formData);
  };

  // Update Forms
  updateForm(formId: string, formData: any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/forms/${formId}`, formData);
  };

  // Delete Forms
  deleteForm(formId: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/forms/${formId}`);
  };

}