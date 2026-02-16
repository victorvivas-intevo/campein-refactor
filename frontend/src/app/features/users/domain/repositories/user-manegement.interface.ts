import { Observable } from "rxjs";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../dtos/user.dto";

export abstract class UserManagementInterface {
  abstract createUser(userData: CreateUserDto): Observable<UserResponseDto>;
  abstract updateUser(userData: UpdateUserDto, id: string): Observable<any>;
  abstract activateUser(id: string): Observable<void>;
  abstract deactivateUser(id: string): Observable<void>;
  abstract deleteUser(id: string): Observable<void>;
}