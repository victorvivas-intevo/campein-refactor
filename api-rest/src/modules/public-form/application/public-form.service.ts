// src/modules/public-form/application/public-form.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicFormRepository } from '../infrastructure/public-form.repository';
import { PublicFormSchemaResponseDto } from './dtos/public-form-schema-response.dto';
import { PublicFormSubmissionRequestDto } from './dtos/public-form-submission-request.dto';
import { PublicFormSubmissionResponseDto } from './dtos/public-form-submission-response.dto';

@Injectable()
export class PublicFormService {
  constructor(private readonly publicFormRepository: PublicFormRepository) {}

  /**
   * Devuelve el schema activo de un formulario público a partir de su código.
   * Este DTO es el que consumirá el frontend Angular para construir el formulario.
   */
  async getPublicFormSchemaByCode(
    code: string,
  ): Promise<PublicFormSchemaResponseDto> {
    const formVersion =
      await this.publicFormRepository.findActiveFormVersionByCode(code);

    if (!formVersion) {
      throw new NotFoundException(
        `No se encontró un formulario público activo con el código "${code}"`,
      );
    }

    return {
      formId: formVersion.form.id,
      code: formVersion.form.code,
      name: formVersion.form.name,
      version: formVersion.version,
      schema: formVersion.schema,
    };
  }

  async submitPublicForm(
    code: string,
    dto: PublicFormSubmissionRequestDto,
  ): Promise<PublicFormSubmissionResponseDto> {
    const formVersion =
      await this.publicFormRepository.findActiveFormVersionByCode(code);

    if (!formVersion) {
      throw new NotFoundException(
        `No se encontró un formulario público activo con el código "${code}"`,
      );
    }

    const submission = await this.publicFormRepository.createSubmission({
      formId: formVersion.form.id,
      formVersionId: formVersion.id,
      payload: dto.payload,
      submittedBy: dto.submittedBy ?? null,
      metadata: dto.metadata ?? null,
    });

    return {
      id: submission.id,
      formId: submission.formId,
      formVersionId: submission.formVersionId,
      submittedAt: submission.submittedAt,
    };
  }
}
