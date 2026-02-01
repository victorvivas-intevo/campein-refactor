
import { Observable } from "rxjs";
import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from "../../domain/dtos/form-list.dto";
import { FormsGatewayInterface } from "../../domain/repositories/forms-gateway.interface";

export class GetFormByCodeUseCase {
  constructor(private readonly gateway: FormsGatewayInterface) {}

  execute(code: string): Observable<GetFormDTO> {
    console.log('GetFormByCodeUseCase execute method called');
    return this.gateway.getFormByCode(code);
  }
}

