import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsRepositoryInterface } from '../../domain/repositories/locations.repository.interface'; 
import { DepartmentDto } from '../../domain/dtos/locations.dto';

@Injectable()
export class GetDepartmentsUseCase {
  constructor(private readonly gateway: LocationsRepositoryInterface) {}

  execute(): Observable<DepartmentDto[]> {
    return this.gateway.getDepartments();
  }
}