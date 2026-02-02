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
    const response = await this.formQueryRepository.findByTenant(tenantId);

    if (!response)
      throw new NotFoundException(`Error al traer los formularios`);
    const forms = response.map((f) => ({
      ...f,
      submissionCount: f.versions?.reduce(
        (acc, v) => acc + v._count!.submissions,
        0,
      ),
      versions: f.versions?.map((v) => ({
        id: v.id,
        version: v.version,
        isActive: v.isActive,
        createdAt: v.createdAt,
        submissionCount: v._count?.submissions,
      })),
    }));

    return forms;
  }

  async getFormById(formId: string): Promise<PublicFormSchemaResponseDto> {
    const form = (await this.formQueryRepository.findById(
      formId,
    )) as PublicFormSchemaResponseDto;
    if (!form) throw new NotFoundException(`Error al traer el formulario`);
    form.submissionCount = form._count?.submissions;
    delete form._count;

    if (form.submissions) {
      const flatSubmissions = form.submissions.map((sub) => {
        // Extraemos el valor (puede ser string o number según tu schema)
        const versionValue = sub.formVersion?.version;

        // Retornamos la submission modificada
        return {
          id: sub.id,
          submittedAt: sub.submittedAt,
          submittedBy: sub.userSubmited?.fullName || undefined,
          payload: (sub.payload as Record<string, any>) || undefined,
          metadata: (sub.metadata as Record<string, any>) || undefined,
          versionSubmited: versionValue,
          userSubmited: sub.userSubmited || null,
        };
      });
      return { ...form, submissions: flatSubmissions };
    }
    return form;
  }

  async getFormByCode(code: string): Promise<PublicFormSchemaResponseDto> {
    const form = (await this.formQueryRepository.findByCode(
      code,
    )) as PublicFormSchemaResponseDto;
    if (!form) throw new NotFoundException(`Error al traer el formulario`);
    form.submissionCount = form._count?.submissions;
    delete form._count;

    if (form.submissions) {
      const flatSubmissions = form.submissions.map((sub) => {
        // Extraemos el valor (puede ser string o number según tu schema)
        const versionValue = sub.formVersion?.version;

        // Retornamos la submission modificada
        return {
          id: sub.id,
          submittedAt: sub.submittedAt,
          submittedBy: sub.userSubmited?.fullName || undefined,
          payload: (sub.payload as Record<string, any>) || undefined,
          metadata: (sub.metadata as Record<string, any>) || undefined,
          versionSubmited: versionValue,
          userSubmited: sub.userSubmited || null,
        };
      });
      return { ...form, submissions: flatSubmissions };
    }
    return form;
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

  async getUsersByFormId(formId: string): Promise<any[]> {
    const users = await this.formQueryRepository.getUsersByFormId(formId);
    if (!users) {
      throw new NotFoundException(`Error al traer los usuarios del formulario`);
    }
    return users;
  }
}
