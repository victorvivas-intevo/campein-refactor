import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import { UserRepository } from '../../infrastructure/user.repository';
import { FindUsersOptions, UserResponseDto } from '../dtos/user.dto';
import type { UserQueryService } from '../../infrastructure/interfaces/user-query.repository';
import { USER_QUERY_REPOSITORY } from '../tokens';
import type { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryService,
  ) {}

  async getUsersByTenant(
    session: UserPayload,
    tenantId: string,
  ): Promise<UserResponseDto[]> {
    if (session.role !== 'ADMIN_SISTEMA') {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }
    const users = await this.userQueryRepository.findUsersByTenant(tenantId);

    if (!users) {
      throw new NotFoundException(`Error al traer los usuarios`);
    }

    return users;
  }

  async getUserById(
    session: UserPayload,
    userId: string,
  ): Promise<UserResponseDto> {
    if (session.role === 'LIDER_BETA') {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }
    const user = await this.userQueryRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`No hay usuarios con el id ${userId}`);
    }

    if (session.role !== 'ADMIN_SISTEMA' && user.role === 'ADMIN_SISTEMA') {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }

    if (session.role === 'LIDER_ALFA' && user.leaderId !== session.id) {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }

    if (
      session.role === 'ADMIN_CAMPANA' &&
      user.tenantId !== session.tenantId
    ) {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }

    return user;
  }

  async getAllUsers(session: UserPayload): Promise<UserResponseDto[]> {
    if (session.role === 'LIDER_BETA') {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }
    const whereCondition: FindUsersOptions = {
      tenantId: session.tenantId,
    };
    if (session.role === 'LIDER_ALFA') {
      whereCondition.leaderId = session.id;
    }
    if (session.role === 'ADMIN_SISTEMA') {
      delete whereCondition.tenantId;
    }
    const users = await this.userQueryRepository.findAllUsers(whereCondition);

    if (!users) {
      throw new NotFoundException(`Error al traer los usuarios`);
    }

    return users;
  }

  async getUserSubordinates(
    session: UserPayload,
    userId: string,
  ): Promise<UserResponseDto[]> {
    if (session.role === 'LIDER_BETA') {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }
    let query: string = userId;
    if (session.role === 'LIDER_ALFA') query = session.id;
    const user = await this.userQueryRepository.findUserById(query);
    if (!user) {
      throw new NotFoundException(`No hay usuarios con el id ${query}`);
    }

    if (
      session.role === 'ADMIN_CAMPANA' &&
      user.tenantId !== session.tenantId
    ) {
      throw new UnauthorizedException(
        `No tienes permisos para acceder a esta información`,
      );
    }

    const users = await this.userQueryRepository.findUserSubordinates(query);
    if (!users) {
      throw new NotFoundException(
        `No hay usuarios subordinados al usuario con id ${userId}`,
      );
    }
    return users;
  }
}
