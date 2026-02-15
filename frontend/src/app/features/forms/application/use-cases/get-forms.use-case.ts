import { Observable } from "rxjs";
import { GetFormDTO } from "../../domain/dtos/form-list.dto";
import { FormsGatewayInterface } from "../../domain/repositories/forms-gateway.interface";
import { inject } from "@angular/core";
import { SESSION_STORE_TOKEN } from "@/features/auth/application/interfaces/session-store.interface";

export class GetFormsUseCase {
  private sessionStore = inject(SESSION_STORE_TOKEN);
  constructor(private readonly gateway: FormsGatewayInterface) {}

  execute(id?: string): Observable<GetFormDTO[]> {
    let tenantId: string;
    const role = this.sessionStore.getRoleId();
    if(id && role === 'ADMIN_SISTEMAS') { tenantId = id; }
    else {
      tenantId = this.sessionStore.getTenantId();
    }
    if(role === 'ADMIN_SISTEMAS' || role === 'ADMIN_CAMPANA'){
      return this.gateway.getFormsByTenantId(tenantId);
    } else {
      return this.gateway.getFormsAssigmentUsers(tenantId);
    }
  }
}
