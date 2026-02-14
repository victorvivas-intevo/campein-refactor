import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
// import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from '../dtos/form-list.dto';

export interface UserGatewayInterface {
  getUsers(): Observable<UserResponseDto[]>;
  getUsersByTenant(tenantId: string): Observable<UserResponseDto[]>;
  getUser(userId: string): Observable<UserResponseDto>;
  getSubordinates(userId: string): Observable<UserResponseDto[]>;
  createUser(userData: CreateUserDto): Observable<any>;
  updateUser(userData: UpdateUserDto, id: string): Observable<any>;
  activateUser(id: string): Observable<void>;
  deactivateUser(id: string): Observable<void>;
  deleteUser(id: string): Observable<void>;
}
