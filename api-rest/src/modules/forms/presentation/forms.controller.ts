// src/modules/public-form/presentation/public-form.controller.ts
import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Post,
  // Put,
} from '@nestjs/common';
import { GetFormsService } from '../application/use-case/get-form.service';
import type { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('forms')
export class FormsController {
  constructor(private readonly getFormsService: GetFormsService) {}

  @Get('byTenant/:tenantId')
  async getFormsByTenant(
    @CurrentUser() currentUser: UserPayload,
    @Param('tenantId') tenantId: string,
  ): Promise<any[]> {
    return this.getFormsService.getFormsByTenant(currentUser, tenantId);
  }

  @Get('byId/:formId')
  async getFormsById(
    @CurrentUser() currentUser: UserPayload,
    @Param('formId') formId: string): Promise<any> {
    return this.getFormsService.getFormById(currentUser, formId);
  }

  @Get('byCode/:formCode')
  async getFormsByCode(@Param('formCode') formCode: string): Promise<any> {
    return this.getFormsService.getFormByCode(formCode);
  }

  @Get('getUsersbyFormId/:formId')
  async getUsersByFormId(@Param('formId') formId: string): Promise<any> {
    return this.getFormsService.getUsersByFormId(formId);
  }

  @Get('getSchema/:schemaId')
  async getSchemaById(@Param('schemaId') schemaId: string): Promise<any> {
    return this.getFormsService.getFormSchemaById(schemaId);
  }

  @Get('getSubmissions/:schemaId')
  async getSubmissionBySchemaId(
    @Param('schemaId') schemaId: string,
  ): Promise<any> {
    return this.getFormsService.getSubmissionBySchemaId(schemaId);
  }

  @Get('getFormsAssigmentUser/:idUser')
  async getFormsAssigmentUser(
    @CurrentUser() currentUser: UserPayload,
    @Param('idUser') idUser: string,
  ): Promise<any> {
    return this.getFormsService.getFormsAssigmentUser(currentUser, idUser);
  }
}
