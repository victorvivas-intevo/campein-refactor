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
  SubmissionDTO,
  SubmissionsRequestDTO,
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

  async findById(
    formId: string,
    userOpts?: { role: string; userId: string },
  ): Promise<any | null> {
    // 1. Construimos el filtro para los submissions anidados
    let submissionWhere: Prisma.FormSubmissionWhereInput | undefined =
      undefined;

    if (userOpts) {
      if (userOpts.role === 'LIDER_ALFA') {
        submissionWhere = {
          OR: [
            { submittedBy: userOpts.userId },
            { userSubmited: { leaderId: userOpts.userId } },
          ],
        };
      } else if (userOpts.role === 'LIDER_BETA') {
        submissionWhere = {
          submittedBy: userOpts.userId,
        };
      }
      // Si es ADMIN, submissionWhere se queda en undefined y trae todo.
    }

    const data = await this.prisma.form.findFirst({
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
              select: { id: true, email: true, fullName: true, role: true },
            },
          },
        },
        versions: {
          orderBy: { createdAt: 'desc' },
        },
        // 2. Aplicamos el filtro en la relación anidada
        submissions: {
          where: submissionWhere, // <--- AQUÍ INYECTAMOS LA LÓGICA
          select: {
            id: true,
            submittedAt: true,
            userSubmited: {
              select: { id: true, email: true, fullName: true, role: true },
            },
            payload: true,
            metadata: true,
            formVersion: {
              select: { id: true, version: true },
            },
          },
          orderBy: {
            submittedAt: 'desc',
          },
        },
        name: true,
        _count: {
          select: { submissions: true },
        },
      },
      where: {
        id: formId,
      },
    });

    if (!data) return null;

    const flattenedAssignments = data.assignments.map(
      (assignment) => assignment.user,
    );

    return {
      ...data,
      assignments: flattenedAssignments,
    };
  }

  async findByCode(
    formCode: string,
    userOpts?: { role: string; userId: string },
  ): Promise<any | null> {
    // 1. Construimos el filtro para los submissions anidados
    let submissionWhere: Prisma.FormSubmissionWhereInput | undefined =
      undefined;

    if (userOpts) {
      if (userOpts.role === 'LIDER_ALFA') {
        submissionWhere = {
          OR: [
            { submittedBy: userOpts.userId },
            { userSubmited: { leaderId: userOpts.userId } },
          ],
        };
      } else if (userOpts.role === 'LIDER_BETA') {
        submissionWhere = {
          submittedBy: userOpts.userId,
        };
      }
      // Si es ADMIN, submissionWhere se queda en undefined y trae todo.
    }

    const data = await this.prisma.form.findFirst({
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
              select: { id: true, email: true, fullName: true, role: true },
            },
          },
        },
        versions: {
          orderBy: { createdAt: 'desc' },
        },
        // 2. Aplicamos el filtro en la relación anidada
        submissions: {
          where: submissionWhere, // <--- AQUÍ INYECTAMOS LA LÓGICA
          select: {
            id: true,
            submittedAt: true,
            userSubmited: {
              select: { id: true, email: true, fullName: true, role: true },
            },
            payload: true,
            metadata: true,
            formVersion: {
              select: { id: true, version: true },
            },
          },
          orderBy: {
            submittedAt: 'desc',
          },
        },
        name: true,
        _count: {
          select: { submissions: true },
        },
      },
      where: {
        code: formCode,
      },
    });

    if (!data) return null;

    const flattenedAssignments = data.assignments.map(
      (assignment) => assignment.user,
    );

    return {
      ...data,
      assignments: flattenedAssignments,
    };
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
      orderBy: {
        createdAt: 'desc',
      },
      where: whereCondition,
    });
  }

  /**
   * Traer los registros por formulario
   */
  async findSubmissions(
    options: SubmissionsRequestDTO,
  ): Promise<SubmissionDTO[]> {
    const whereCondition: Prisma.FormSubmissionWhereInput = {};

    if (options.formId) whereCondition.formId = options.formId;
    if (options.formVersionId)
      whereCondition.formVersionId = options.formVersionId;
    if (options.submittedAt) whereCondition.submittedAt = options.submittedAt; // Typo corregido

    // LOGICA DE ROLES PARA SUBMISSIONS
    if (options.submittedBy && options.userSubmited?.leaderId) {
      // Caso LIDER_ALFA: Traer los hechos por mí OR los hechos por usuarios donde yo soy su leaderId
      whereCondition.OR = [
        { submittedBy: options.submittedBy }, // Hechos por el LIDER_ALFA
        { userSubmited: { leaderId: options.userSubmited.leaderId } }, // Hechos por sus LIDER_BETA subordinados
      ];
    } else if (options.submittedBy) {
      // Caso LIDER_BETA: Traer únicamente los hechos por él
      whereCondition.submittedBy = options.submittedBy;
    }

    const submissions = await this.prisma.formSubmission.findMany({
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
      where: whereCondition,
    });

    return submissions.map((sub) => ({
      ...sub,
      payload: sub.payload as Record<string, any>,
      metadata: sub.metadata as Record<string, unknown> | null,
      userSubmited: sub.userSubmited
        ? {
            id: sub.userSubmited.id,
            email: sub.userSubmited.email,
            role: sub.userSubmited.role,
            fullName: sub.userSubmited.fullName ?? undefined,
          }
        : null,
    }));
  }
}
