import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  PublicFormSchemaResponse,
  PublicFormSubmissionResponse,
} from '../domain/types/public-form.types';

@Injectable({
  providedIn: 'root',
})
export class PublicFormApiService {
  private readonly baseUrl = `${environment.apiUrl}/public-forms`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene el schema del formulario público por código.
   * Ej: GET /public-forms/public-contact-form
   */
  getSchemaByCode(code: string): Observable<PublicFormSchemaResponse> {
    return this.http.get<PublicFormSchemaResponse>(`${this.baseUrl}/${code}`);
  }

  /**
   * POST envío de formulario
   */
  submitForm(
    code: string,
    payload: Record<string, any>,
    options?: {
      submittedBy?: string;
      metadata?: Record<string, any>;
    }
  ): Observable<PublicFormSubmissionResponse> {
    return this.http.post<PublicFormSubmissionResponse>(`${this.baseUrl}/${code}/submissions`, {
      payload,
      submittedBy: options?.submittedBy,
      metadata: options?.metadata,
    });
  }
}
