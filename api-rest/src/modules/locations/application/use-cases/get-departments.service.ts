import { Inject, Injectable } from '@nestjs/common';
import { type LocationQueryRepository } from '../../domain/repositories/location-query.repository';
import { LOCATIONS_REPOSITORY } from '../tokens';

@Injectable()
export class GetDepartmentsService {
  constructor(
    @Inject(LOCATIONS_REPOSITORY)
    private readonly repository: LocationQueryRepository,
  ) {}

  async execute() {
    return this.repository.findAllDepartments();
  }
}
