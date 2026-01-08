import { Observable } from "rxjs";
import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO } from "../../domain/dtos/form-list.dto";
import { FormsGatewayInterface } from "../../domain/repositories/forms-gateway.interface";

export class GetFormSubmissionUseCase {
  constructor(private readonly gateway: FormsGatewayInterface) {}

  execute(formId: string, submissionId: string): Observable<GetFormSubmissionDTO> {
    console.log('GetFormSubmissionUseCase execute method called');
    return this.gateway.getFormSubmissionById(formId, submissionId);
  }
}
