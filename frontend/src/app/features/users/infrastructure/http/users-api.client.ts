import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
// import {
//   GetFormDTO,
//   GetFormSubmissionDTO,
//   GetFormVersionDTO,
// } from '../../domain/dtos/form-list.dto';

export const USER_API_URL = new InjectionToken<string>('USER_API_URL');

@Injectable()
export class UserApiClient {

  constructor(
    private readonly http: HttpClient,
    @Inject(USER_API_URL) private readonly baseUrl: string,
  ) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getUsersByTenant(tenantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/byTenant/${tenantId}`);
  }

  getUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}`);
  }
}
