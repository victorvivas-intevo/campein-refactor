import { Module } from '@nestjs/common';
import { PublicFormController } from './presentation/public-form.controller';
import { PublicFormService } from './application/public-form.service';
import { PublicFormRepository } from './infrastructure/public-form.repository';

@Module({
  controllers: [PublicFormController],
  providers: [PublicFormService, PublicFormRepository],
  exports: [PublicFormService],
})
export class PublicFormModule {}
