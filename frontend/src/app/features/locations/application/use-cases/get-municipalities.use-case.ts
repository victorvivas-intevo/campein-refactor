import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsRepositoryInterface } from '../../domain/repositories/locations.repository.interface'; 
import { MunicipalityDto } from '../../domain/dtos/locations.dto';

@Injectable()
export class GetMunicipalitiesUseCase {
  constructor(private readonly gateway: LocationsRepositoryInterface) {}

  execute(departmentCode: string): Observable<MunicipalityDto[]> {
    return this.gateway.getMunicipalities(departmentCode);
  }
}