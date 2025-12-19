// src/modules/public-form/presentation/public-form.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetFormsService } from '../application/use-case/get-form.service';

@Controller('forms')
export class FormsController {
  constructor(private readonly getFormsService: GetFormsService) {}

  @Get('byTenant/:tenantId')
  async getFormsByTenant(@Param('tenantId') tenantId: string): Promise<any[]> {
    return this.getFormsService.getFormsByTenant(tenantId);
  }

  @Get('getSchema/:schemaId')
  async getSchemaById(@Param('schemaId') schemaId: string): Promise<any> {
    return this.getFormsService.getFormSchemaById(schemaId)
  }
  
  @Get('getSubmissions/:schemaId')
  async getSubmissionBySchemaId(@Param('schemaId') schemaId: string): Promise<any> {
    return this.getFormsService.getSubmissionBySchemaId(schemaId)
  }
}
