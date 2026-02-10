import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import { UserRepository } from '../../infrastructure/user.repository';
import { FormRequestDto, PublicFormSchemaResponseDto } from '../dtos/forms.dto';
import type { FormQueryService } from '../../infrastruture/interfaces/form-query.repository';
import { FORM_QUERY_REPOSITORY } from '../tokens';
import { UserPayload } from 'src/modules/auth/domain/interfaces/user-payload.interface';

@Injectable()
export class GetFormsService {
  constructor(
    @Inject(FORM_QUERY_REPOSITORY)
    private readonly formQueryRepository: FormQueryService,
  ) {}

  async getFormsByTenant(
    session: UserPayload,
    tenantId: string,
  ): Promise<PublicFormSchemaResponseDto[]> {
    if (session.role !== 'ADMIN_SISTEMA' && session.role !== 'ADMIN_CAMPANA') {
      throw new UnauthorizedException(`No tienes permisos para ver los formularios`);
    }
    if (session.role !== 'ADMIN_SISTEMA') tenantId = session.tenantId;
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

  async getFormById(session: UserPayload, formId: string): Promise<PublicFormSchemaResponseDto> {
    if (!formId) throw new BadRequestException(`El id del formulario es requerido`);

    const form = (await this.formQueryRepository.findById(
      formId,
    )) as PublicFormSchemaResponseDto;

    if (!form) throw new NotFoundException(`Error al traer el formulario`);

    if (form.tenantId !== session.tenantId && session.role !== 'ADMIN_SISTEMA') {
      throw new UnauthorizedException(`No tienes permisos para ver el formulario`);
    }

    if (session.role === 'LIDER_BETA' || session.role === 'LIDER_ALFA') {
      console.log('Verificando asignación de formulario para el usuario LIDER_BETA/ALFA');
      const isAssigned = await this.formQueryRepository.getFormsAssigmentUser({
        userId: session.id
      });
      if (!isAssigned || !isAssigned.some((f) => f.id === formId)) {
        console.log('No es autorizado: el formulario no está asignado al usuario');
        throw new UnauthorizedException(`No tienes permisos para ver el formulario`);
      }
    }
    
    form.submissionCount = form._count?.submissions;
    delete form._count;

    if (form.submissions && session.role !== 'LIDER_BETA') {
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
    if (session.role === 'LIDER_BETA') {
      // Eliminar campos que no se necesitan para el rol LIDER_BETA
      delete form.submissions;
      delete form.submissionCount;
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

  async getFormsAssigmentUser(
    session: UserPayload,
    idUser: string,
  ): Promise<PublicFormSchemaResponseDto[]> {
    const options: FormRequestDto = {};
    if (session.role !== 'ADMIN_SISTEMA') {
      options.tenantId = session.tenantId;
    } else if (!idUser) {
      throw new BadRequestException(`El id del usuario es requerido`);
    } else {
      options.userId = idUser;
    }
    const response =
      await this.formQueryRepository.getFormsAssigmentUser(options);
    if (!response)
      throw new NotFoundException(`El usuario no tiene formularios asignados`);
    return response;
  }
}
