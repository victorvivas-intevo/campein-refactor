import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FindUsersOptions, UserResponseDto } from '../dtos/user.dto';
import type { UserQueryService } from '../../infrastructure/interfaces/user-query.repository';
import { USER_QUERY_REPOSITORY } from '../tokens';
import type { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Injectable()
export class GetUsersAvailableForAssignment {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryService,
  ) {}

  async execute(
    session: UserPayload,
    tenantId: string,
    caseId: string
  ): Promise<UserResponseDto[]> {
    if (session.role === 'LIDER_BETA') {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }

    if (session.role !== 'ADMIN_SISTEMA') {
      tenantId = session.tenantId;
    }

    const options: FindUsersOptions = {
      isActive: true,
      tenantId: tenantId,
      role: caseId === 'assignmentAlfa' ? 'LIDER_ALFA' : 'LIDER_BETA',
      leaderId: null,
    }

    const users = await this.userQueryRepository.findAllUsers(options);

    if (!users) {
      throw new NotFoundException(`Error al traer los usuarios`);
    }

    return users;
  }
}
