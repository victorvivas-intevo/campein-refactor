import { UserResponseDto } from "../../application/dtos/user.dto";

export interface UserQueryService {
  findUsersByTenant(tenantId: string): Promise<UserResponseDto[] | null>;
  findAllUsers(): Promise<UserResponseDto[] | null>;
  findUserById(userId: string): Promise<UserResponseDto | null>;
}
