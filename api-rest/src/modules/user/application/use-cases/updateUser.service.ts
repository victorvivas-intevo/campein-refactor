import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import type { UserManagementService } from '../../infrastructure/interfaces/user-management.repository';
import { USER_COMMAND_REPOSITORY } from '../tokens';
import { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userManagementService: UserManagementService,
  ) {}

  async execute(
    session: UserPayload,
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if (session.id !== id) {
      if (
        session.role !== 'ADMIN_SISTEMA' &&
        session.role !== 'ADMIN_CAMPANA'
      ) {
        throw new UnauthorizedException(
          `No tienes permisos para actualizar el usuario`,
        );
      }
    }
    const user = await this.userManagementService.updateUser(id, dto);
    return user;
  }
}
