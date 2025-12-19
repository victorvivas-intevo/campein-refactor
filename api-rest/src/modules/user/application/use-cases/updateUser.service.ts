import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import type { UserManagementService } from '../../infrastructure/interfaces/user-management.repository';
import { USER_COMMAND_REPOSITORY } from '../tokens';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userManagementService: UserManagementService
  ) {}

    async execute(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
      const user = await this.userManagementService.updateUser(id, dto);
      return user;
    }
}
