import { Observable } from 'rxjs';
import { DepartmentDto, MunicipalityDto } from '../dtos/locations.dto';

export abstract class LocationsRepositoryInterface {
  abstract getDepartments(): Observable<DepartmentDto[]>;
  abstract getMunicipalities(departmentCode: string): Observable<MunicipalityDto[]>;
}