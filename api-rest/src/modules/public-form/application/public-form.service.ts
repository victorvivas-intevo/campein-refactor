// src/modules/public-form/application/public-form.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicFormRepository } from '../infrastructure/public-form.repository';
import {
  PublicFormSchemaResponseDto,
  PublicFormsDto,
} from './dtos/public-form-schema-response.dto';
import { PublicFormSubmissionRequestDto } from './dtos/public-form-submission-request.dto';
import { PublicFormSubmissionResponseDto } from './dtos/public-form-submission-response.dto';

@Injectable()
export class PublicFormService {
  constructor(private readonly publicFormRepository: PublicFormRepository) {}

  async getFormsByTenant(code: string): Promise<PublicFormsDto[]> {
    const forms = await this.publicFormRepository.getFormsByTenant(code);

    if (!forms || forms.length === 0) {
      throw new NotFoundException(
        `No se encontraron formularios públicos para la campana con código "${code}"`,
      );
    }
    return forms;
  }

  /**
   * Devuelve el schema activo de un formulario público a partir de su código.
   * Este DTO es el que consumirá el frontend Angular para construir el formulario.
   * @param tenantCode El código del inquilino al que pertenece el formulario.
   * @param formCode El código del formulario público que se quiere obtener.
   * @returns El schema del formulario público con su información básica (id, código, nombre, versión)
   */
  async getPublicFormSchemaByCode(
    tenantCode: string,
    formCode: string,
  ): Promise<PublicFormSchemaResponseDto> {
    const formVersion =
      await this.publicFormRepository.findActiveFormVersionByCode(
        tenantCode,
        formCode,
      );

    if (!formVersion) {
      throw new NotFoundException(
        `No se encontró un formulario público activo con el código "${formCode}" del inquilino "${tenantCode}"`,
      );
    }

    return {
      formId: formVersion.form.id,
      code: formVersion.form.code,
      name: formVersion.form.name,
      version: formVersion.version,
      schema: formVersion.schema,
      isActive: formVersion.form.isActive,
      isPublic: formVersion.form.isPublic,
    };
  }

  /**
   * Servicio para recibir las respuestas de los formularios públicos. Valida que el formulario exista y esté activo, y luego guarda la respuesta.
   * @param tenantCode El código del inquilino al que pertenece el formulario
   * @param formCode El código del formulario público al que se le está enviando la respuesta
   * @param dto Los datos de la respuesta del formulario
   * @returns La respuesta del formulario guardada
   */
  async submitPublicForm(
    tenantCode: string,
    formCode: string,
    dto: PublicFormSubmissionRequestDto,
  ): Promise<PublicFormSubmissionResponseDto> {
    const formVersion =
      await this.publicFormRepository.findActiveFormVersionByCode(
        tenantCode,
        formCode,
      );

    if (!formVersion) {
      throw new NotFoundException(
        `No se encontró un formulario público activo con el código "${formCode}" del inquilino "${tenantCode}"`,
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
