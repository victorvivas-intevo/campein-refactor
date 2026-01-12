import { Observable } from "rxjs";
import { GetFormDTO } from "../../domain/dtos/form-list.dto";
import { FormsGatewayInterface } from "../../domain/repositories/forms-gateway.interface";
import { inject } from "@angular/core";
import { SESSION_STORE_TOKEN } from "@/features/auth/application/interfaces/session-store.interface";

export class GetFormsUseCase {
  private sessionStore = inject(SESSION_STORE_TOKEN);
  constructor(private readonly gateway: FormsGatewayInterface) {}

  execute(): Observable<GetFormDTO[]> {
    const tenantId = this.sessionStore.getTenantId();
    return this.gateway.getFormsByTenantId(tenantId);
  }
}
