// src/modules/public-form/infrastructure/public-form.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, Form, FormVersion, FormSubmission } from '@prisma/client';

@Injectable()
export class PublicFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca la versión activa más reciente de un formulario público por código.
   */
  async findActiveFormVersionByCode(
    code: string,
  ): Promise<(FormVersion & { form: Form }) | null> {
    return this.prisma.formVersion.findFirst({
      where: {
        isActive: true,
        form: {
          code
        },
      },
      include: {
        form: true,
      },
      orderBy: {
        version: 'desc',
      },
    });
  }

  async createSubmission(params: {
    formId: string;
    formVersionId: string;
    payload: Record<string, any>;
    submittedBy?: string | null;
    metadata?: Record<string, any> | null;
  }): Promise<FormSubmission> {
    const { formId, formVersionId, payload, submittedBy, metadata } = params;

    return this.prisma.formSubmission.create({
      data: {
        formId,
        formVersionId,
        payload: payload as Prisma.InputJsonValue,
        submittedBy: submittedBy ?? null,
        metadata: (metadata as Prisma.InputJsonValue) ?? undefined,
      },
    });
  }
}
