import { PublicFormsGatewayInterface } from '../../domain/repositories/public-forms.query.interface';

export class GetFormSchemaUseCase {
  constructor(private readonly gateway: PublicFormsGatewayInterface) {}

  execute(tenantCode: string, formCode: string) {
    return this.gateway.getFormSchema(tenantCode, formCode);
  }
}