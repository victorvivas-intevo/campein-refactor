// src/modules/public-form/presentation/public-form.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PublicFormService } from '../application/public-form.service';
import {
  PublicFormSchemaResponseDto,
  PublicFormsDto,
} from '../application/dtos/public-form-schema-response.dto';
import { PublicFormSubmissionRequestDto } from '../application/dtos/public-form-submission-request.dto';
import { PublicFormSubmissionResponseDto } from '../application/dtos/public-form-submission-response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('public-forms')
export class PublicFormController {
  constructor(private readonly publicFormService: PublicFormService) {}

  @Public()
  @Get('getFormsByTenant/:code')
  async getPublicFormsByTenant(
    @Param('code') code: string,
  ): Promise<PublicFormsDto[]> {
    return this.publicFormService.getFormsByTenant(code);
  }

  @Public()
  @Get('getFormSchema/:tenantCode/:formCode')
  async getSchema(
    @Param('tenantCode') tenantCode: string,
    @Param('formCode') formCode: string,
  ): Promise<PublicFormSchemaResponseDto> {
    return this.publicFormService.getPublicFormSchemaByCode(
      tenantCode,
      formCode,
    );
  }

  /**
   * POST /public-forms/:code/submissions
   *
   * Body esperado:
   * {
   *   "payload": { ...valores del formulario... },
   *   "submittedBy": "opcional",
   *   "metadata": { "ip": "...", "userAgent": "..." }
   * }
   */
  @Public()
  @Post('submissions/:tenantCode/:formCode')
  async submit(
    @Param('tenantCode') tenantCode: string,
    @Param('formCode') formCode: string,
    @Body() body: PublicFormSubmissionRequestDto,
  ): Promise<PublicFormSubmissionResponseDto> {
    return this.publicFormService.submitPublicForm(tenantCode, formCode, body);
  }
}
