import { PublicFormsDto } from '../../application/dtos/public-form-schema-response.dto';

export interface PublicFormQueryRepository {
  getFormsByTenant(code: string): Promise<PublicFormsDto[]>;
}
