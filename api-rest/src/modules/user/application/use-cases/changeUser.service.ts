import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { UserManagementService } from '../../infrastructure/interfaces/user-management.repository';
import type { UserQueryService } from '../../infrastructure/interfaces/user-query.repository';
import { USER_COMMAND_REPOSITORY, USER_QUERY_REPOSITORY } from '../tokens';
import { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Injectable()
export class ChangeUserStatusService {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userManagementService: UserManagementService,
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryService: UserQueryService,
  ) {}

  async execute(
    session: UserPayload,
    id: string,
    status: boolean,
  ): Promise<void> {
    if (session.role !== 'ADMIN_CAMPANA' && session.role !== 'ADMIN_SISTEMA') {
      throw new UnauthorizedException(
        `No tienes permisos para cambiar el estado de usuarios`,
      );
    }
    const user = await this.userQueryService.findUserById(id);

    if (!user) {
      throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
    }

    if (
      user.tenantId !== session.tenantId &&
      session.role === 'ADMIN_CAMPANA'
    ) {
      throw new UnauthorizedException(
        `No puedes cambiar el estado de un usuario que no pertenece a tu campaña`,
      );
    }

    if (session.role === 'ADMIN_CAMPANA' && user.role === 'ADMIN_SISTEMA') {
      throw new UnauthorizedException(
        `No puedes cambiar el estado de un usuario con rol ADMIN_SISTEMA`,
      );
    }

    if (session.role === 'ADMIN_CAMPANA' && user.role === 'ADMIN_CAMPANA') {
      throw new UnauthorizedException(
        `No puedes cambiar el estado de un usuario con rol ADMIN_CAMPANA, solo el rol ADMIN_SISTEMA puede cambiar su estado`,
      );
    }

    await this.userManagementService.changeUserStatus(id, status);
  }
}
