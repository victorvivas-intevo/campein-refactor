import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationQueryRepository } from '../domain/repositories/location-query.repository';

@Injectable()
export class LocationRepository implements LocationQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllDepartments() {
    return this.prisma.department.findMany({
      orderBy: { name: 'asc' },
      select: { code: true, name: true },
    });
  }

  async findMunicipalitiesByDepartment(departmentCode: string) {
    return this.prisma.municipality.findMany({
      where: { department: { code: departmentCode } },
      orderBy: { name: 'asc' },
      select: { code: true, name: true },
    });
  }
}
