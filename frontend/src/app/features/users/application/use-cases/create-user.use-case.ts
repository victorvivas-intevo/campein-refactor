import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagementInterface } from '../../domain/repositories/user-manegement.interface';
import { CreateUserDto, UserResponseDto } from '../../domain/dtos/user.dto';


@Injectable()
export class CreateUserUseCase {
  constructor(private readonly gateway: UserManagementInterface) {}

  execute(userData: CreateUserDto): Observable<UserResponseDto> {
    return this.gateway.createUser(userData);
  }
}
