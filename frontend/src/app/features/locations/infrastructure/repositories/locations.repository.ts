import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentDto, MunicipalityDto } from '../../domain/dtos/locations.dto';
import { environment } from 'src/environments/environment';
import { LocationsRepositoryInterface } from '../../domain/repositories/locations.repository.interface';

export const LOCATION_API_URL = new InjectionToken<string>('LOCATION_API_URL');

@Injectable()
export class LocationsRepository implements LocationsRepositoryInterface {
//   private readonly apiUrl = `${environment.apiUrl}/locations`;

  constructor(
    private readonly http: HttpClient,
    @Inject(LOCATION_API_URL) private readonly baseUrl: string,
  ) {}

  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(`${this.baseUrl}/locations/departments`);
  }

  getMunicipalities(departmentCode: string): Observable<MunicipalityDto[]> {
    return this.http.get<MunicipalityDto[]>(`${this.baseUrl}/locations/municipalities`, {
      params: { departmentCode },
    });
  }
}
