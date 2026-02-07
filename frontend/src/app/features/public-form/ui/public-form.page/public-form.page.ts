import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Card } from '@/shared/ui/components/card/card';
import { DynamicForm } from '@/shared/ui/form-controls/dynamic-form/dynamic-form';
import { CommonModule } from '@angular/common';
import { FieldLabelActionConfig, FormFieldConfig, FormSchema } from '@/shared/ui/form-controls/form-control.types';

import defaultFormSchema from '@/schemas/default-form.schema.json';
import { PublicFormApiService } from '../../data-access/public-form.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Modal } from '@/shared/ui/components/modal/modal';
import { ToastService } from '@/shared/services/toast/toast.service';
// import defaultFormSchema from '@/schemas/contact-form.schema.json';

@Component({
  selector: 'app-public-form.page',
  imports: [Card, CommonModule, DynamicForm, Modal],
  templateUrl: './public-form.page.html',
  styleUrl: './public-form.page.css',
})
export class PublicFormPage {
  @ViewChild(DynamicForm)
  dynamicForm!: DynamicForm;

  @ViewChild('pageTop')
  pageTop!: ElementRef<HTMLDivElement>;

  // estado
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  formSchema = signal<FormSchema | null>(null);

  // estado de envío
  submitting = signal<boolean>(false);
  submitSuccess = signal<boolean | null>(null);
  submitError = signal<string | null>(null);

  // Controlador de modal
  dataPolicyModalOpen = signal(false);

  // Toast: notificación
  private toast = inject(ToastService);

  private formCode!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly publicFormApi: PublicFormApiService
  ) {}

  ngOnInit(): void {
    this.formCode = this.route.snapshot.paramMap.get('code') ?? 'voluntario-publico';
    this.loadFormSchema(this.formCode);
  }

  private loadFormSchema(code: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.publicFormApi
      .getSchemaByCode(code)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if(response){
            if(!response.isActive || !response.isPublic){
              this.error.set('Este formulario no existe o no está disponible.');
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
                    type: "openModal",
                    modalId: "data-policy",
                    text: "Política de tratamiento de datos"
                  }
                ]
              },
              required: true,
              column: 1,
              order: 999
            }
            data.fields.push(check)
            this.formSchema.set(data);
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.error.set('Este formulario no existe o ya no está disponible.');
          } else {
            this.error.set('No fue posible cargar el formulario.');
          }
          console.error('Error cargando formulario público', err);          
        },
      });
  }

  onSubmit(payload: Record<string, any>): void {
    this.submitting.set(true);
    this.submitError.set(null);
    this.submitSuccess.set(null);

    this.publicFormApi
      .submitForm(this.formCode, payload, {
        // aquí puedes pasar info adicional:
        metadata: {
          userAgent: navigator.userAgent,
          source: 'public-form-page',
        },
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (res) => {
          // console.log('Envío guardado en backend:', res);
          this.submitSuccess.set(true);
          this.dynamicForm?.resetForm();
          this.toast.success('Formulario enviado con éxito.');
          this.scrollToTop();
        },
        error: (err) => {
          console.error('Error enviando formulario', err);
          this.submitError.set('Ocurrió un error al enviar el formulario. Intenta de nuevo.');
        },
      });
  }

  private scrollToTop(): void {
    if (this.pageTop?.nativeElement) {
      this.pageTop.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onFieldLabelAction(action: FieldLabelActionConfig): void {
    if (action.type === 'openModal' && action.modalId === 'data-policy') {
      this.dataPolicyModalOpen.set(true);
    }
  }

  openDataPolicy(): void {
    this.dataPolicyModalOpen.set(true);
  }

  closeDataPolicy(): void {
    this.dataPolicyModalOpen.set(false);
  }
}
