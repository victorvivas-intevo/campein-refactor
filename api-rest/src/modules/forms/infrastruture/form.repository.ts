import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

import type { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/client';

import * as bcrypt from 'bcryptjs';

import { PublicFormSchemaResponseDto } from '../application/dtos/forms.dto';
// import { FormManagementService } from './interfaces/form-management.repository';
import { FormQueryService } from './interfaces/form-query.repository';

@Injectable()
export class FormRepository implements FormQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async findByTenant(tenantId: string): Promise<any[] | null> {
    return this.prisma.form.findMany({
      select: {
        code: true,
        name: true,
        description: true,
        versions: {
          select: {
            id: true,
            version: true,
            isActive: true,
            createdAt: true,
            _count: {
              select: {
                submissions: true,
              },
            },
          },
        },
        id: true,
        createdAt: true,
      },
      where: {
        tenantId: tenantId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(formId: string): Promise<any | null> {
    return this.prisma.form.findFirst({
      select: {
        id: true,
        code: true,
        createdAt: true,
        description: true,
        isPublic: true,
        versions: true,
        submissions: true,
        name: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      where: {
        id: formId,
      },
    });
  }

  async findSchemaById(schemaId: string): Promise<any | null> {
    return this.prisma.formVersion.findFirst({
      select: {
        formId: true,
        schema: true,
        id: true,
        version: true,
        isActive: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      where: {
        id: schemaId,
      },
    });
  }

  async findSubmissionBySchemaId(schemaId: string): Promise<any | null> {
    return this.prisma.formVersion.findFirst({
      select: {
        schema: true,
        isActive: true,
        submissions: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      where: {
        id: schemaId,
      },
    });
  }


}
