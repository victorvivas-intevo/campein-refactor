import { UserResponseDto } from "src/modules/user/application/dtos/user.dto";

export interface LoginRepositoryInterface {
  findByEmail(email: string): Promise<UserResponseDto | null>;
  saveAccessToken(user: UserResponseDto, refreshHash: string, expiresAt: Date, meta?: { ip?: string; userAgent?: string }): Promise<{id: string}>;
  logout(sessionId: string): Promise<void>;
  getSessionById(sessionId: string): Promise<{ userId: string; revokedAt: Date | null; expiresAt: Date } | null>;
}
