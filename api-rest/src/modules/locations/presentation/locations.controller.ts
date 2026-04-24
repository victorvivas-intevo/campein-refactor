import { Controller, Get, Query } from '@nestjs/common';
import { GetDepartmentsService } from '../application/use-cases/get-departments.service';
import { GetMunicipalitiesService } from '../application/use-cases/get-municipalities.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly getDepartmentsService: GetDepartmentsService,
    private readonly getMunicipalitiesService: GetMunicipalitiesService,
  ) {}

  @Public() // Asumiendo que es para formularios públicos
  @Get('departments')
  async getDepartments() {
    return this.getDepartmentsService.execute();
  }

  @Public()
  @Get('municipalities')
  async getMunicipalities(@Query('departmentCode') code: string) {
    return this.getMunicipalitiesService.execute(code);
  }
}
