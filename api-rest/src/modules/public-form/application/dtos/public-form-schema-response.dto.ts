export class PublicFormSchemaResponseDto {
  formId: string;
  code: string;
  name: string;
  version: number;
  schema: unknown;
  imageCard?: string;
  isActive?: boolean;
  isPublic?: boolean;
}

export class PublicFormsDto {
  code: string;
  name: string;
  imageCard?: string | null;
}
