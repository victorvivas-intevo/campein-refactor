import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
// import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from '../dtos/form-list.dto';

export abstract class UserQueryInterface {
  abstract getUsers(): Observable<UserResponseDto[]>;
  abstract getUsersByTenant(tenantId: string): Observable<UserResponseDto[]>;
  abstract getUser(userId: string): Observable<UserResponseDto>;
  abstract getSubordinates(userId: string): Observable<UserResponseDto[]>;
}
