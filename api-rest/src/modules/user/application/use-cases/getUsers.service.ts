import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { UserRepository } from '../../infrastructure/user.repository';
import { UserResponseDto } from '../dtos/user.dto';
import type { UserQueryService } from '../../infrastructure/interfaces/user-query.repository';
import { USER_QUERY_REPOSITORY } from '../tokens';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryService
  ) {}

  async getUsersByTenant(
    tenantId: string,
  ): Promise<UserResponseDto[]> {
    const users =
      await this.userQueryRepository.findUsersByTenant(tenantId);

    if (!users) {
      throw new NotFoundException(
        `Error al traer los usuarios`,
      );
    }

    return users
  }

  async getUserById(
    userId: string,
  ): Promise<UserResponseDto> {
    const user =
      await this.userQueryRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException(
        `Error al traer los usuarios`,
      );
    }

    return user
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userQueryRepository.findAllUsers();

    if (!users) {
      throw new NotFoundException(
        `Error al traer los usuarios`,
      );
    }

    return users
  }
  
}
