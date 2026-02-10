export class PublicFormSchemaResponseDto {
  id?: string;
  formId?: string;
  code?: string;
  name?: string;
  versionActive?: number;
  versions?: FormVersion[];
  schema?: unknown;
  submissions?: SubmissionDTO[];
  isActive?: boolean;
  createdAt?: Date;
  isPublic?: boolean;
  submissionCount?: number;
  _count?: {
    submissions: number;
  };
  assignments?: UserDTO[];
}

export interface FormRequestDto {
  id?: string;
  code?: string;
  name?: string;
  schema?: unknown;
  isPublic?: boolean;
  isActive?: boolean;
  tenantId?: string;
  createdBy?: string;
  version?: number;
}

export interface SubmissionDTO {
  id?: string;
  submittedAt?: Date;
  submittedBy?: string | null;
  payload?: Record<string, any> | null;
  metadata?: Record<string, unknown> | null;
  userSubmited: UserDTO | null;
  formVersion?: FormVersion;
  versionSubmited?: number;
}

export interface UserDTO {
  id?: string;
  email?: string;
  fullName?: string;
  role?: string;
}

export interface FormVersion {
  id?: string;
  version?: number;
  isActive?: boolean;
  _count?: {
    submissions: number;
  };
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
