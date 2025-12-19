import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

import type { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/client';

import * as bcrypt from 'bcryptjs';

import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../application/dtos/user.dto';
import { UserManagementService } from './interfaces/user-management.repository';
import { UserQueryService } from './interfaces/user-query.repository';

@Injectable()
export class UserRepository implements UserQueryService, UserManagementService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly userSelect = {
    id: true,
    tenantId: true,
    email: true,
    fullName: true,
    role: true,
    tenant: {
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    },
  } as const;


  async findUsersByTenant(tenantId: string): Promise<UserResponseDto[] | null> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        tenantId: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: false,
        password: false,
      },
      where: {
        tenantId: tenantId,
      },
      orderBy: {
        fullName: 'asc',
      },
    });
  }

  async findUserById(userId: string): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        tenantId: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: false,
        password: false,
        tenant: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
      },
      where: {
        id: userId,
      }
    });
  }

  /**
   * Busca todos los usuarios .
   */
  async findAllUsers(): Promise<(UserResponseDto[]) | null> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        tenantId: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        password: false,
        tenant: true
      },
      orderBy: {
        fullName: 'asc',
      }
    });
  }

 /**
   * Crear usuario individual
   */
  async createUser(userDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 12);

      const created = await this.prisma.user.create({
        data: {
          tenantId: userDto.tenantId,
          email: userDto.email.trim().toLowerCase(),
          fullName: userDto.fullName,
          role: userDto.role,
          password: hashedPassword,
        },
        select: this.userSelect,
      });

      return created as unknown as UserResponseDto;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Ya existe un usuario con ese email.');
        }
        if (e.code === 'P2003') {
          throw new BadRequestException('El tenantId no existe o es inválido.');
        }
      }
      throw e;
    }
  }

  /**
   * Actualizar usuario individual
   */
  async updateUser(userId: string, userDto: UpdateUserDto): Promise<UserResponseDto> {
    try {
      // arma el data sin tocar password si no viene
      const data: Prisma.UserUpdateInput = {
        email: userDto.email?.trim().toLowerCase(),
        fullName: userDto.fullName,
        role: userDto.role,
      };

      // si password viene vacío, no lo actualiza
      if (userDto.password && userDto.password.trim().length > 0) {
        data.password = await bcrypt.hash(userDto.password, 12);
      }

      const updated = await this.prisma.user.update({
        where: { id: userId },
        data,
        select: this.userSelect,
      });

      return updated as unknown as UserResponseDto;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Usuario no encontrado.');
        }
        if (e.code === 'P2002') {
          throw new ConflictException('Ya existe un usuario con ese email.');
        }
      }
      throw e;
    }
  }

  /**
   * Eliminar usuario individual
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Usuario no encontrado.');
      }
      throw e;
    }
  }
}
