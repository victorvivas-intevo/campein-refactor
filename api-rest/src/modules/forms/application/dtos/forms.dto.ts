export class PublicFormSchemaResponseDto {
  id?: string;
  formId?: string;
  code?: string;
  name?: string;
  version?: number;
  schema?: unknown;
  submissions?: unknown[];
  isActive?: boolean;
  createdAt?: Date;
  submissionCount?: number;
}

import { IsObject, IsOptional } from 'class-validator';

export class PublicFormSubmissionRequestDto {
  /**
   * Datos diligenciados en el formulario.
   * Ej: { documentType: 'CC', documentNumber: '123', ... }
   */
  @IsObject()
  payload: Record<string, any>;

  /**
   * Identificador del usuario que envía el formulario (opcional).
   * userId.
   */
  @IsOptional()
  submittedBy?: string;

  /**
   * Metadatos opcionales (IP, userAgent, browser, etc.).
   */
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class PublicFormSubmissionResponseDto {
  id: string;
  formId: string;
  formVersionId: string;
  submittedAt: Date;
}
