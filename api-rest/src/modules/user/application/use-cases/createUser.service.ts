import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserRepository } from '../../infrastructure/user.repository';
import { CreateUserDto, UserResponseDto } from '../dtos/user.dto';
import type { UserManagementService } from '../../infrastructure/interfaces/user-management.repository';
import { USER_COMMAND_REPOSITORY } from '../tokens';
import { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userManagementService: UserManagementService,
  ) {}

  async execute(
    session: UserPayload,
    dto: CreateUserDto,
  ): Promise<UserResponseDto> {
    if (session.role === 'LIDER_BETA') {
      throw new UnauthorizedException(`No tienes permisos para crear usuarios`);
    }
    if (session.role === 'LIDER_ALFA') {
      dto.leaderId = session.id;
      dto.role = 'LIDER_BETA';
    }
    if (dto.role === 'ADMIN_SISTEMA' && session.role !== 'ADMIN_SISTEMA') {
      throw new UnauthorizedException(
        `No tienes permisos para crear usuarios con rol ADMIN_SISTEMA`,
      );
    }
    if (
      dto.role === 'ADMIN_CAMPANA' &&
      session.role !== 'ADMIN_SISTEMA' &&
      session.role !== 'ADMIN_CAMPANA'
    ) {
      throw new UnauthorizedException(
        `No tienes permisos para crear usuarios con rol ADMIN_CAMPANA`,
      );
    }
    if (dto.role !== 'ADMIN_SISTEMA') {
      dto.tenantId = session.tenantId;
    }
    const user = await this.userManagementService.createUser(dto);
    return user;
  }
}
