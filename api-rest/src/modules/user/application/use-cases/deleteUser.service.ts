import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import type { UserManagementService } from '../../infrastructure/interfaces/user-management.repository';
import { USER_COMMAND_REPOSITORY } from '../tokens';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userManagementService: UserManagementService
  ) {}

    async execute(id: string): Promise<void> {
      await this.userManagementService.deleteUser(id);
    }
}
