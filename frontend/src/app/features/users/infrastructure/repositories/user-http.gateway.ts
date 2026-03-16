import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../domain/dtos/user.dto';
import { UserQueryInterface } from '../../domain/repositories/user-query.interface';
import { UserManagementInterface } from '../../domain/repositories/user-manegement.interface';
// import {
//   GetFormDTO,
//   GetFormSubmissionDTO,
//   GetFormVersionDTO,
// } from '../../domain/dtos/form-list.dto';

export const USER_API_URL = new InjectionToken<string>('USER_API_URL');

@Injectable()
export class UserApiClient implements UserQueryInterface, UserManagementInterface {

  constructor(
    private readonly http: HttpClient,
    @Inject(USER_API_URL) private readonly baseUrl: string,
  ) {}

  getUsers(): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}/users`);
  }

  getUsersByTenant(tenantId: string): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}/users/byTenant/${tenantId}`);
  }

  getUser(userId: string): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.baseUrl}/users/${userId}`);
  }

  getSubordinates(userId: string): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}/users/subordinates/${userId}`);
  }
  
  createUser(userData: CreateUserDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}/users`, userData);
  }
  
  updateUser(userData: UpdateUserDto, id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${id}`, userData);
  }

  activateUser(id: string): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/users/${id}/activate`);
  }

  deactivateUser(id: string): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/users/${id}/deactivate`);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  getUsersToAssignment(caseType: string, tenantId: string): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}/users/to-assignment/${tenantId}/${caseType}`);
  }

}
