import {
  FindUsersOptions,
  UserResponseDto,
} from '../../application/dtos/user.dto';

export interface UserQueryService {
  findUsersByTenant(tenantId: string): Promise<UserResponseDto[] | null>;
  findAllUsers(options: FindUsersOptions): Promise<UserResponseDto[] | null>;
  findUserById(userId: string): Promise<UserResponseDto | null>;
  findUserSubordinates(userId: string): Promise<UserResponseDto[] | null>;
}
