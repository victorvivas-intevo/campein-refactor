import { Observable } from "rxjs";
import { GetFormDTO, GetFormVersionDTO } from "../../domain/dtos/form-list.dto";
import { FormsGatewayInterface } from "../../domain/repositories/forms-gateway.interface";

export class GetFormSchemaUseCase {
  constructor(private readonly gateway: FormsGatewayInterface) {}

  execute(id: string): Observable<GetFormVersionDTO> {
    console.log('GetFormSchemaUseCase execute method called');
    return this.gateway.getFormSchema(id);
  }
}
