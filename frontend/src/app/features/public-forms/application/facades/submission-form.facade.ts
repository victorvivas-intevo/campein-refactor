// features/public-forms/application/facades/submission-form.facade.ts
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetFormSchemaUseCase } from '../use-cases/get-form-schema.use-case';
import { SubmitFormUseCase } from '../use-cases/submission-form.use-case';
import { PublicFormSchemaResponse } from '../../domain/dtos/public-form.dtos'; 
import { ToastService } from '@/shared/services/toast/toast.service';
import { FormFieldConfig, FormSchema } from '@/shared/ui/form-controls/form-control.types';
import { urlDataPolicyConsent } from '@/shared/valueObjects/valueObjects';

@Injectable({ providedIn: 'root' })
export class SubmissionFormFacade {
  private getSchemaUseCase = inject(GetFormSchemaUseCase);
  private submitFormUseCase = inject(SubmitFormUseCase);
  private toast = inject(ToastService);

  // ESTADO (Signals) usando tu interfaz
  schemaResponse = signal<PublicFormSchemaResponse | null>(null);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  success = signal<boolean>(false);

  async loadSchema(tenantCode: string, formCode: string) {
    this.loading.set(true);
    this.success.set(false);
    try {
      // Retorna el PublicFormSchemaResponse completo
      const response = await firstValueFrom(this.getSchemaUseCase.execute(tenantCode, formCode));

      if(!response.isActive || !response.isPublic){
        // this.error.set('Este formulario no existe o no está disponible.');
        console.error('Este formulario no existe o no está disponible.');
        return;
      }
      const data: FormSchema = response.schema
      const check: FormFieldConfig = {
        id: "dataPolicyConsent",
        type: "checkbox",
        label: {
          text: "Autorizo el tratamiento de mis datos personales de acuerdo con la",
          actions: [
            {
              type: "externalLink",
              url: urlDataPolicyConsent,
              text: "Política de tratamiento de datos",
            }
          ]
        },
        required: true,
        column: 1,
        order: 999,
      }
      data.fields.push(check)
      // this.formSchema.set(data);
      response.schema = data; // Actualizamos el schema con el nuevo campo
      this.schemaResponse.set(response);
    } catch (error) {
      this.toast.error('Error', 'No se pudo cargar el diseño del formulario.');
      this.schemaResponse.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  async submit(tenantCode: string, formCode: string, payload: Record<string, any>, options?: { submittedBy?: string; metadata?: Record<string, any> }) {
    this.submitting.set(true);
    try {
      const data = {
        payload,
        submittedBy: options?.submittedBy,
        metadata: options?.metadata,
      } 
      const response = await firstValueFrom(this.submitFormUseCase.execute(tenantCode, formCode, data));
      this.success.set(true);
      // Opcional: Puedes hacer algo con response.id o response.submittedAt
      this.toast.success('¡Enviado!', 'Tus respuestas han sido registradas exitosamente.');
    } catch (error) {
      this.toast.error('Error', 'Tuvimos un problema al guardar tus datos.');
    } finally {
      this.submitting.set(false);
    }
  }

  resetState() {
    this.success.set(false);
  }
}