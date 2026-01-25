// src/modules/public-form/presentation/public-form.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PublicFormService } from '../application/public-form.service';
import { PublicFormSchemaResponseDto } from '../application/dtos/public-form-schema-response.dto';
import { PublicFormSubmissionRequestDto } from '../application/dtos/public-form-submission-request.dto';
import { PublicFormSubmissionResponseDto } from '../application/dtos/public-form-submission-response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('public-forms')
export class PublicFormController {
  constructor(private readonly publicFormService: PublicFormService) {}

  @Public()
  @Get(':code')
  async getSchema(
    @Param('code') code: string,
  ): Promise<PublicFormSchemaResponseDto> {
    return this.publicFormService.getPublicFormSchemaByCode(code);
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
  @Post(':code/submissions')
  async submit(
    @Param('code') code: string,
    @Body() body: PublicFormSubmissionRequestDto,
  ): Promise<PublicFormSubmissionResponseDto> {
    return this.publicFormService.submitPublicForm(code, body);
  }
}
