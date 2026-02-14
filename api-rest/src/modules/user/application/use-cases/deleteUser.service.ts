import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import { UpdateUserDto } from '../dtos/user.dto';
import type { UserManagementService } from '../../infrastructure/interfaces/user-management.repository';
import type { UserQueryService } from '../../infrastructure/interfaces/user-query.repository';
import { USER_COMMAND_REPOSITORY, USER_QUERY_REPOSITORY } from '../tokens';
import { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userManagementService: UserManagementService,
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryService: UserQueryService,
  ) {}

  async execute(currentUser: UserPayload, id: string): Promise<void> {
    if (
      currentUser.role !== 'ADMIN_SISTEMA' &&
      currentUser.role !== 'ADMIN_CAMPANA'
    ) {
      throw new UnauthorizedException(
        `No tienes permisos para eliminar usuarios`,
      );
    }

    const userToDelete = await this.userQueryService.findUserById(id);

    if (!userToDelete) {
      throw new NotFoundException(`El usuario con ID ${id} no existe`);
    }

    if (userToDelete.role === 'ADMIN_SISTEMA') {
      throw new UnauthorizedException(
        `No puedes eliminar un usuario con rol ADMIN_SISTEMA`,
      );
    }

    if (
      userToDelete.role === 'ADMIN_CAMPANA' &&
      currentUser.role === 'ADMIN_CAMPANA'
    ) {
      throw new UnauthorizedException(
        `No puedes eliminar un usuario con rol ADMIN_CAMPANA, solo el rol ADMIN_SISTEMA puede eliminarlo`,
      );
    }

    await this.userManagementService.deleteUser(id);
  }
}
