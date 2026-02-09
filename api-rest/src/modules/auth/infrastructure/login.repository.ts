import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

import { UserResponseDto } from 'src/modules/user/application/dtos/user.dto';
import { LoginRepositoryInterface } from './interfaces/login-interface.repository';

@Injectable()
export class LoginRepository implements LoginRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  private readonly userSelect = {
    id: true,
    tenantId: true,
    email: true,
    fullName: true,
    role: true,
    password: true,
    isActive: true,
    tenant: {
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    },
  } as const;

  /**
   * Busca todos los usuarios .
   */
  async logout(sessionId: string): Promise<void> {
    await this.prisma.userSession.updateMany({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email.trim().toLowerCase(),
        },
        select: this.userSelect,
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.error(e);
        throw new ConflictException('error repository ', e.message);
      }
      throw e;
    }
  }

  async saveAccessToken(
    user: UserResponseDto,
    refreshHash: string,
    expiresAt: Date,
    meta?: { ip?: string; userAgent?: string },
  ): Promise<{ id: string }> {
    try {
      const result = await this.prisma.userSession.create({
        data: {
          userId: user.id,
          tenantId: user.tenantId,
          refreshTokenHash: refreshHash,
          expiresAt,
          ip: meta?.ip,
          userAgent: meta?.userAgent,
        },
        select: { id: true },
      });
      return result;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.error(e);
        throw new ConflictException(
          'error repository saveAccessToken',
          e.message,
        );
      }
      throw e;
    }
  }

  async getSessionById(sessionId: string): Promise<{
    userId: string;
    revokedAt: Date | null;
    expiresAt: Date;
  } | null> {
    const session = await this.prisma.userSession.findUnique({
      where: { id: sessionId },
      select: { userId: true, revokedAt: true, expiresAt: true },
    });
    return session;
  }
}
