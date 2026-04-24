import { Module } from '@nestjs/common';
import { LocationsController } from './presentation/locations.controller';
import { GetDepartmentsService } from './application/use-cases/get-departments.service';
import { GetMunicipalitiesService } from './application/use-cases/get-municipalities.service';
import { LocationRepository } from './infrastructure/location.repository';
import { LOCATIONS_REPOSITORY } from './application/tokens';

@Module({
  controllers: [LocationsController],
  providers: [
    GetDepartmentsService,
    GetMunicipalitiesService,
    {
      provide: LOCATIONS_REPOSITORY,
      useClass: LocationRepository,
    },
  ],
})
export class LocationsModule {}
