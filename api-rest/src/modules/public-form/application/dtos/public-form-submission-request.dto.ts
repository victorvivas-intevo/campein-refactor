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
