import { Observable } from 'rxjs';
import { PublicFormsDto } from '../dtos/query.dtos';

export interface PublicFormsGatewayInterface {
    getFormsByTenantCode(tenantCode: string): Observable<PublicFormsDto[]>;
}