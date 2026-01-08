import { Observable } from "rxjs";
import { GetFormDTO, RequestGetFormDTO } from "../../domain/dtos/form-list.dto";
import { FormsGatewayInterface } from "../../domain/repositories/forms-gateway.interface";

export class GetFormUseCase {
  constructor(private readonly gateway: FormsGatewayInterface) {}

  execute(dto: RequestGetFormDTO): Observable<GetFormDTO> {
    console.log('GetFormUseCase execute method called');
    if(dto.id) return this.gateway.getFormById(dto.id);
    if(dto.code) return this.gateway.getFormByCode(dto.code);
    
    throw new Error('Invalid input: dto must have either an id or a code');
  }
}
