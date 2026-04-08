import { Observable } from "rxjs";
import { PublicFormsGatewayInterface } from "../../domain/repositories/public-forms.query.interface";
import { PublicFormsDto } from "../../domain/dtos/query.dtos";


export class GetFormsByTenantUseCase {
  constructor(private readonly gateway: PublicFormsGatewayInterface) {}

  execute(code: string): Observable<PublicFormsDto[]> {
    return this.gateway.getFormsByTenantCode(code);
  }
}