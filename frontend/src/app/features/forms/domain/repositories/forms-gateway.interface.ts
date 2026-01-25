import { Observable } from 'rxjs';
import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from '../dtos/form-list.dto';

export interface FormsGatewayInterface {
  // Get Forms 
  getFormById(formId: string): Observable<GetFormDTO>;
  getFormByCode(code: string): Observable<GetFormDTO>;
  getFormsByTenantId(tenantId: string): Observable<GetFormDTO[]>;
  // Get submissions
  getFormSchema(versionId: string): Observable<GetFormVersionDTO>;
  getFormSubmissionById(formId: string, submissionId: string): Observable<GetFormSubmissionDTO>;
  // Create Forms
  createForm(formData: any): Observable<any>;
  // Update Forms
  updateForm(formId: string, formData: any): Observable<any>;
  // Delete Forms
  deleteForm(formId: string): Observable<any>;
  
}