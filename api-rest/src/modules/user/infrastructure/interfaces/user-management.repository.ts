import {
  CreateUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '../../application/dtos/user.dto';

export interface UserManagementService {
  createUser(userDto: CreateUserDto): Promise<UserResponseDto>;
  updateUser(userId: string, userDto: UpdateUserDto): Promise<UserResponseDto>;
  deleteUser(userId: string): Promise<void>;
  changeUserStatus(userId: string, status: boolean): Promise<void>;
}
