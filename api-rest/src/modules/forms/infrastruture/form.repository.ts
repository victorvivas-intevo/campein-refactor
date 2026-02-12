import {
  // ConflictException,
  Injectable,
  // NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

// import type { Prisma } from '@prisma/client';
// import {
//   PrismaClientKnownRequestError,
//   PrismaClientUnknownRequestError,
// } from '@prisma/client/runtime/client';

// import * as bcrypt from 'bcryptjs';

// import { PublicFormSchemaResponseDto } from '../application/dtos/forms.dto';
// import { FormManagementService } from './interfaces/form-management.repository';
import { FormQueryService } from './interfaces/form-query.repository';
import {
  FormRequestDto,
  PublicFormSchemaResponseDto,
} from '../application/dtos/forms.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FormRepository implements FormQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async findByTenant(
    tenantId: string,
  ): Promise<PublicFormSchemaResponseDto[] | null> {
    return this.prisma.form.findMany({
      select: {
        code: true,
        name: true,
        description: true,
        isPublic: true,
        isActive: true,
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
        isActive: true,
        tenantId: true,
        assignments: {
          select: {
            user: {
              select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
              },
            },
          },
        },
        versions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        submissions: {
          select: {
            id: true,
            submittedAt: true,
            userSubmited: {
              select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
              },
            },
            payload: true,
            metadata: true,
            formVersion: {
              select: {
                id: true,
                version: true,
              },
            },
          },
          orderBy: {
            submittedAt: 'desc',
          },
        },
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

  async findByCode(formCode: string): Promise<any | null> {
    return this.prisma.form.findFirst({
      select: {
        id: true,
        code: true,
        createdAt: true,
        description: true,
        isPublic: true,
        isActive: true,
        assignments: {
          select: {
            user: {
              select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
              },
            },
          },
        },
        versions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        submissions: {
          select: {
            id: true,
            submittedAt: true,
            userSubmited: {
              select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
              },
            },
            payload: true,
            metadata: true,
            formVersion: {
              select: {
                id: true,
                version: true,
              },
            },
          },
          orderBy: {
            submittedAt: 'desc',
          },
        },
        name: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      where: {
        code: formCode,
      },
    });
  }

  async findSchemaById(
    schemaId: string,
  ): Promise<PublicFormSchemaResponseDto | null> {
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

  async findSubmissionBySchemaId(
    schemaId: string,
  ): Promise<PublicFormSchemaResponseDto | null> {
    return this.prisma.formVersion.findFirst({
      select: {
        schema: true,
        isActive: true,
        // submissions: true,
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

  async getUsersByFormId(formId: string): Promise<any | null> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
      where: {
        assignedForms: {
          some: {
            formId: formId,
          },
        },
      },
    });
  }

  async getFormsAssigmentUser(
    options: FormRequestDto,
  ): Promise<PublicFormSchemaResponseDto[] | null> {
    const whereCondition: Prisma.FormWhereInput = {
      assignments: {
        some: {
          userId: options.userId,
        },
      },
    };
    return this.prisma.form.findMany({
      where: whereCondition,
    });
  }
}
