import { PublicFormSchemaResponseDto } from "../../application/dtos/forms.dto";

export interface FormQueryService {
  // Super admin y admin campain (tenant)
  findByTenant(tenantId: string): Promise<PublicFormSchemaResponseDto[] | null>;
  findSchemaById(schemaId: string): Promise<PublicFormSchemaResponseDto | null>;
  findSubmissionBySchemaId(schemaId: string): Promise<PublicFormSchemaResponseDto | null>;
}
