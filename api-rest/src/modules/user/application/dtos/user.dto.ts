export interface UserResponseDto {
  id: string;
  tenantId: string;
  email: string;
  fullName: string | null;
  role: string;
  tenant?: TenantInterface;
  password?: string;
}

export interface TenantInterface {
  id?: string;
  name?: string;
  createdAt?: Date;
}

export interface CreateUserDto {
  tenantId: string;
  email: string;
  fullName: string | null;
  role: string;
  password: string;
}

export interface UpdateUserDto {
  email: string;
  fullName: string | null;
  role: string;
  password?: string;
}
