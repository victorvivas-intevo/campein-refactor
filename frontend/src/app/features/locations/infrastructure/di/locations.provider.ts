import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { GetDepartmentsUseCase } from '../../application/use-cases/get-deparments.use-case'; 
import { GetMunicipalitiesUseCase } from '../../application/use-cases/get-municipalities.use-case'; 
import { LocationsRepository, LOCATION_API_URL } from '../repositories/locations.repository';
import { LocationsFacade } from '../../application/facades/locations.facade';

export function provideLocations(locationsApiUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    LocationsRepository,
    // TODO: agregar más casos de uso y repositorios a medida que se vayan creando
    { provide: GetDepartmentsUseCase, useFactory: (gateway: LocationsRepository) => new GetDepartmentsUseCase(gateway), deps: [LocationsRepository] },
    { provide: GetMunicipalitiesUseCase, useFactory: (gateway: LocationsRepository) => new GetMunicipalitiesUseCase(gateway), deps: [LocationsRepository] },

    LocationsFacade,
    { provide: LOCATION_API_URL, useValue: locationsApiUrl },
  ]);
}
