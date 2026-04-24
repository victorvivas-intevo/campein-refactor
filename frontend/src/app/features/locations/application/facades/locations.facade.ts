import { Injectable } from '@angular/core';
import { GetDepartmentsUseCase } from '../use-cases/get-deparments.use-case';
import { GetMunicipalitiesUseCase } from '../use-cases/get-municipalities.use-case';

@Injectable()
export class LocationsFacade {
  constructor(
    private readonly getDepartmentsUc: GetDepartmentsUseCase,
    private readonly getMunicipalitiesUc: GetMunicipalitiesUseCase
  ) {}

  getDepartments() {
    return this.getDepartmentsUc.execute();
  }

  getMunicipalities(departmentCode: string) {
    return this.getMunicipalitiesUc.execute(departmentCode);
  }
}