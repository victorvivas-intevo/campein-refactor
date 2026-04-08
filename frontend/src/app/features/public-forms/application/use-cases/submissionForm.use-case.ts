import { Observable } from "rxjs";
import { PublicFormsGatewayInterface } from "../../domain/repositories/public-forms.query.interface";
import { PublicFormsDto } from "../../domain/dtos/query.dtos";


export class SentSubmissionFormUseCase {
  constructor(private readonly gateway: PublicFormsGatewayInterface) {}

  execute(): Observable<any> {
    return new Observable(observer => {
      observer.next({ message: 'This is a placeholder response from GetFormsByTenantUseCase.' });
      observer.complete();
    });
    // return this.gateway.getFormsByTenantCode(code);
  }
}