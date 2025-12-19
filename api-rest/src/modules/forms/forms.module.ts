import { Module } from '@nestjs/common';
import { FormsController } from './presentation/forms.controller';
// import { PublicFormService } from './application/public-form.service';
import {FORM_QUERY_REPOSITORY} from './application/tokens'
import { FormRepository } from './infrastruture/form.repository';
import { GetFormsService } from './application/use-case/get-form.service';

@Module({
  controllers: [FormsController],
  providers: [
    GetFormsService,
    FormRepository,
    { provide: FORM_QUERY_REPOSITORY, useExisting: FormRepository },
  ],
  exports: [GetFormsService],
})
export class FormsModule {}
