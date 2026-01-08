import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const AUTH_API_URL = new InjectionToken<string>('AUTH_API_URL');

export interface LoginApiResponse {
  accessToken: string;
  refresh_token?: string;
  user: { id: string; email: string; name?: string; rol?: string };
}

export interface RefreshApiResponse extends LoginApiResponse {}

@Injectable()
export class AuthApiClient {
  // IMPORTANT: este HttpClient evita interceptors (para no hacer loop con refresh)
  private readonly http: HttpClient;

  constructor(
    httpBackend: HttpBackend,
    @Inject(AUTH_API_URL) private readonly baseUrl: string
  ) {
    this.http = new HttpClient(httpBackend);
  }

  login(payload: { email: string; password: string }): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(`${this.baseUrl}/auth/login`, payload);
  }

  refresh(payload: { refreshToken: string }): Observable<RefreshApiResponse> {
    return this.http.post<RefreshApiResponse>(`${this.baseUrl}/auth/refresh`, payload);
  }

  me(accessToken: string): Observable<{ user: LoginApiResponse['user'] }> {
    return this.http.get<{ user: LoginApiResponse['user'] }>(`${this.baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
