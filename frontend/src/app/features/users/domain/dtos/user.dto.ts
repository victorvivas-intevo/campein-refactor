export interface UserResponseDto {
  id: string;
  tenantId: string;
  email: string;
  fullName: string | null;
  role: string;
  isActive: boolean;
  leaderId?: string | null;
  tenant?: TenantInterface;
  campain?: string;
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
  role: UserRole;
  leaderId?: string | null;
  password?: string;
  isActive?: boolean;
}

export interface UpdateUserDto {
  email: string;
  fullName: string | null;
  role: string;
  password?: string;
}

export type UserRole = 'ADMIN_SISTEMA' | 'ADMIN_CAMPANA' | 'LIDER_ALFA' | 'LIDER_BETA';