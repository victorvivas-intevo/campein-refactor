import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { UserRepository } from '../../infrastructure/user.repository';
import { PublicFormSchemaResponseDto } from '../dtos/forms.dto';
import type { FormQueryService } from '../../infrastruture/interfaces/form-query.repository';
import { FORM_QUERY_REPOSITORY } from '../tokens';

@Injectable()
export class GetFormsService {
  constructor(
    @Inject(FORM_QUERY_REPOSITORY)
    private readonly formQueryRepository: FormQueryService,
  ) {}

  async getFormsByTenant(
    tenantId: string,
  ): Promise<PublicFormSchemaResponseDto[]> {
    let response = await this.formQueryRepository.findByTenant(tenantId);

    if(!response) throw new NotFoundException(`Error al traer los formularios`);
    const forms = response.map((f) => ({
      ...f,
      submissionCount: f.versions.reduce(
        (acc, v) => acc + v._count!.submissions,
        0,
      ),
    }));

    if (!forms) {
      throw new NotFoundException(`Error al traer los formularios`);
    }

    return forms;
  }

  async getFormById(
    formId: string,
  ): Promise<PublicFormSchemaResponseDto> {
    const forms = await this.formQueryRepository.findById(formId);
    if(!forms) throw new NotFoundException(`Error al traer el formulario`);
    return forms;
  }

  async getFormSchemaById(
    schemaId: string,
  ): Promise<PublicFormSchemaResponseDto> {
    const form = await this.formQueryRepository.findSchemaById(schemaId);

    if (!form) {
      throw new NotFoundException(`Error al traer el formulario`);
    }

    return form;
  }

  async getSubmissionBySchemaId(
    schemaId: string,
  ): Promise<PublicFormSchemaResponseDto> {
    const form =
      await this.formQueryRepository.findSubmissionBySchemaId(schemaId);

    if (!form) {
      throw new NotFoundException(
        `Error al traer las respuestas del formulario`,
      );
    }

    return form;
  }
}
