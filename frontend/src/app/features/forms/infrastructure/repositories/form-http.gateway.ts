import { Injectable } from '@angular/core';
import { FormsGatewayInterface } from '../../domain/repositories/forms-gateway.interface';
import { FormsApiClient } from '../http/forms-api.client';
import { Observable } from 'rxjs';
import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from '../../domain/dtos/form-list.dto';
import { CreateFormDTO, ResponseCreateFormDTO } from '../../domain/dtos/form-magement.dto';

@Injectable()
export class FormHttpGateway implements FormsGatewayInterface {
  constructor(private readonly api: FormsApiClient) {}

  // Get Forms
  getFormsByTenantId(tenantId: string): Observable<GetFormDTO[]> {
    return this.api.getFormsByTenantId(tenantId);
  }
  getFormById(formId: string): Observable<GetFormDTO> {
    return this.api.getFormById(formId);
  }
  getFormByCode(code: string): Observable<GetFormDTO> {
    return this.api.getFormByCode(code);
  }
  // Get schema
  getFormSchema(versionId: string): Observable<GetFormVersionDTO> {
    return this.api.getFormSchema(versionId);
  }
  // Get submmitions
  getFormSubmissionById(formId: string, submissionId: string): Observable<GetFormSubmissionDTO> {
    return this.api.getFormSubmissionById(formId, submissionId);
  }
  // Create Forms
  createForm(formData: CreateFormDTO): Observable<ResponseCreateFormDTO> {
    return this.api.createForm(formData);
  }
  // Update Forms
  updateForm(formId: string, formData: any): Observable<any> {
    return this.api.updateForm(formId, formData);
  }
  // Delete Forms
  deleteForm(formId: string): Observable<any> {
    return this.api.deleteForm(formId);
  }
}
