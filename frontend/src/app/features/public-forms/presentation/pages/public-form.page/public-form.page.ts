import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { SubmissionFormFacade } from '../../../application/facades/submission-form.facade';
import { DynamicForm } from '@/shared/ui/form-controls/dynamic-form/dynamic-form';
import { Skeleton } from '@/shared/ui/components/skeleton/skeleton';

@Component({
  selector: 'app-public-form',
  standalone: true,
  imports: [CommonModule, DynamicForm, Skeleton],
  templateUrl: './public-form.page.html',
})
export class PublicFormPage implements OnInit {
  codeForm?: string;
  codeTenant?: string;

  // Inyectamos nuestro nuevo Facade
  facade = inject(SubmissionFormFacade);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  //
  isPolicyModalOpen = signal(false);

  schemaWithActions = computed(() => {
    const response = this.facade.schemaResponse();
    if (!response) return null;

    // Buscamos el campo inyectado por la fachada y le pegamos la función gráfica
    const fieldsMapped = response.schema.fields.map(field => {
      // Si la fachada marcó este campo como la política de datos...
      if ((field as any).isPolicyField || field.id === 'dataPolicyConsent') {
        return { 
          ...field, 
          action: () => this.openPolicyModal() // Le inyectamos la acción UI
        };
      }
      return field;
    });

    return {
      ...response,
      fields: fieldsMapped
    };
  });

  ngOnInit(): void {
    // IMPORTANTE: Asegúrate de extraer ambos códigos. 
    // Si tenantCode está en una ruta padre, usa this.route.parent?.snapshot.paramMap
    const formCode = this.route.snapshot.paramMap.get('codeForm');
    const tenantCode = this.route.snapshot.paramMap.get('codeTenant') || this.route.parent?.snapshot.paramMap.get('codeTenant');

    if (formCode && tenantCode) {
      this.codeForm = formCode;
      this.codeTenant = tenantCode;
      this.facade.loadSchema(this.codeTenant, this.codeForm);
    } else {
      console.error('Faltan parámetros en la URL (tenant o form).');
    }
  }

  onSubmit(payload: Record<string, any>) {
    if (this.codeTenant && this.codeForm) {
      this.facade.submit(this.codeTenant, this.codeForm, payload, {
        metadata: {
          userAgent: navigator.userAgent,
          source: `/public/${this.codeTenant}/${this.codeForm}`,
        },
      });
      if(this.facade.success()) {
        // this.submitSuccess.set(true);
        // this.dynamicForm?.resetForm();
      }else{
        console.error('Error enviando formulario');
        // this.submitError.set('Ocurrió un error al enviar el formulario. Intenta de nuevo.');
      }
    }
  }

  goBack() {
    this.location.back();
  }

  openPolicyModal() {
    this.isPolicyModalOpen.set(true);
  }

  closePolicyModal() {
    this.isPolicyModalOpen.set(false);
  }
}