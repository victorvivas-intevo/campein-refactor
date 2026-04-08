import { PublicFormsGatewayInterface } from '../../domain/repositories/public-forms.query.interface'; 

export class SubmitFormUseCase {
  constructor(private readonly gateway: PublicFormsGatewayInterface) {}

  execute(tenantCode: string, formCode: string, data: any) {
    return this.gateway.submitForm(tenantCode, formCode, data);
  }
}