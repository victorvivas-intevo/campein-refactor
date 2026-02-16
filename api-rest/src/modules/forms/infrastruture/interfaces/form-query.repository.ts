import {
  FormRequestDto,
  PublicFormSchemaResponseDto,
  SubmissionDTO,
  SubmissionsRequestDTO,
} from '../../application/dtos/forms.dto';

export interface FormQueryService {
  // Super admin y admin campain (tenant)
  findByCode(
    formCode: string,
    userOpts?: { role: string; userId: string },
  ): Promise<PublicFormSchemaResponseDto | null>;
  findById(
    formId: string,
    userOpts?: { role: string; userId: string },
  ): Promise<PublicFormSchemaResponseDto | null>;
  findByTenant(tenantId: string): Promise<PublicFormSchemaResponseDto[] | null>;
  findSchemaById(schemaId: string): Promise<PublicFormSchemaResponseDto | null>;
  findSubmissionBySchemaId(
    schemaId: string,
  ): Promise<PublicFormSchemaResponseDto | null>;
  getUsersByFormId(formId: string): Promise<any[] | null>;
  getFormsAssigmentUser(
    options: FormRequestDto,
  ): Promise<PublicFormSchemaResponseDto[] | null>;
  findSubmissions(options: SubmissionsRequestDTO): Promise<SubmissionDTO[]>;
}
