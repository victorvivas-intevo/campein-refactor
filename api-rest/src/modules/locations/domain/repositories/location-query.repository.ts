export interface LocationQueryRepository {
  findAllDepartments(): Promise<any[]>;
  findMunicipalitiesByDepartment(departmentCode: string): Promise<any[]>;
}
