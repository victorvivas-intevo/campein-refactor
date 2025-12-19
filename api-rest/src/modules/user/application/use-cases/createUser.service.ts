import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { UserRepository } from '../../infrastructure/user.repository';
import { CreateUserDto, UserResponseDto } from '../dtos/user.dto';
import type { UserManagementService } from '../../infrastructure/interfaces/user-management.repository';
import { USER_COMMAND_REPOSITORY } from '../tokens';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userManagementService: UserManagementService
  ) {}

    async execute(dto: CreateUserDto): Promise<UserResponseDto> {
      const user = await this.userManagementService.createUser(dto);
      return user;
    }
}
