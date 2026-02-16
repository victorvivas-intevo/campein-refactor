import { Observable } from "rxjs";
import { GetFormDTO } from "../../domain/dtos/form-list.dto";
import { FormsGatewayInterface } from "../../domain/repositories/forms-gateway.interface";
import { inject } from "@angular/core";
import { AuthFacade } from "@/features/auth/application/fecades/auth.fecade";

export class GetFormsUseCase {
  private sessionStore = inject(AuthFacade);
  constructor(private readonly gateway: FormsGatewayInterface) {}

  execute(id?: string): Observable<GetFormDTO[]> {
    let tenantId: string;
    const role = this.sessionStore.session()?.user.role;
    if(id && role === 'ADMIN_SISTEMA') { tenantId = id; }
    else {
      tenantId = this.sessionStore.session()?.user.tenantId ?? '';
      if(tenantId === '') {
        throw new Error('Tenant ID is undefined');
      }
    }
    if(role === 'ADMIN_SISTEMA' || role === 'ADMIN_CAMPANA'){
      return this.gateway.getFormsByTenantId(tenantId);
    } else {
      return this.gateway.getFormsAssigmentUsers(tenantId);
    }
  }
}
