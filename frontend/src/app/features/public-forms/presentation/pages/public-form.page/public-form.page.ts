import { Component, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { SubmissionFormFacade } from '../../../application/facades/submission-form.facade';
import { DynamicForm } from '@/shared/ui/form-controls/dynamic-form/dynamic-form';
import { Skeleton } from '@/shared/ui/components/skeleton/skeleton';
import { PublicFormsFacade } from '@/features/public-forms/application/facades/public-form.fecade';
import { FieldLabelActionConfig, FormSchema } from '@/shared/ui/form-controls/form-control.types';
import { LocationsFacade } from '@/features/locations/application/facades/locations.facade';

// 1. IMPORTAMOS EL SERVICIO DE GEOLOCALIZACIÓN
import { GeolocalizationService } from '@/core/services/geolocalization.service';

@Component({
  selector: 'app-public-form',
  standalone: true,
  imports: [CommonModule, DynamicForm, Skeleton],
  templateUrl: './public-form.page.html',
})
export class PublicFormPage implements OnInit {
  codeForm?: string;
  codeTenant?: string;

  submissionFacade = inject(SubmissionFormFacade);
  publicFormFacade = inject(PublicFormsFacade);
  private locationsFacade = inject(LocationsFacade); 
  
  // 2. INYECTAMOS EL SERVICIO
  private geoService = inject(GeolocalizationService);
  
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  isPolicyModalOpen = signal(false);
  currentSchema = signal<FormSchema | null>(null);

  constructor() {
    effect(() => {
      const response = this.submissionFacade.schemaResponse();
      
      if (response && response.schema) {
        const current = untracked(() => this.currentSchema());
        
        if (!current || current.formId !== response.schema.formId) {
          const newSchema = JSON.parse(JSON.stringify(response.schema));
          
          untracked(() => {
            this.currentSchema.set(newSchema);
            this.loadInitialOptions(newSchema);
          });
        }
      }
    }, { allowSignalWrites: true }); 
  }

  ngOnInit(): void {
    const formCode = this.route.snapshot.paramMap.get('codeForm');
    const tenantCode =
      this.route.snapshot.paramMap.get('codeTenant') ||
      this.route.parent?.snapshot.paramMap.get('codeTenant');

    if (formCode && tenantCode) {
      this.codeForm = formCode;
      this.codeTenant = tenantCode;
      this.submissionFacade.loadSchema(this.codeTenant, this.codeForm);
    } else {
      console.error('Faltan parámetros en la URL (tenant o form).');
    }
  }

  private loadInitialOptions(schema: FormSchema) {
    if (!schema) return;
    const rootFields = schema.fields.filter(f => f.dataSource && !f.dependsOn);
    rootFields.forEach(field => {
      this.executeAction(field.dataSource!.action as string).subscribe(data => {
        this.updateFieldOptions(field.id, data, field.dataSource!.valueKey, field.dataSource!.labelKey);
      });
    });
  }

  onLoadOptions(event: { fieldId: string; paramValue: string }) {
    const schema = this.currentSchema();
    if (!schema) return;
    const field = schema.fields.find(f => f.id === event.fieldId);
    if (!field || !field.dataSource) return;

    this.executeAction(field.dataSource.action as string, event.paramValue).subscribe(data => {
      this.updateFieldOptions(field.id, data, field.dataSource!.valueKey, field.dataSource!.labelKey);
    });
  }

  private executeAction(action: string, param?: string): Observable<any[]> {
    switch (action) {
      case 'getDepartments': return this.locationsFacade.getDepartments();
      case 'getMunicipalities': return param ? this.locationsFacade.getMunicipalities(param) : of([]);
      default: return of([]); 
    }
  }

  private updateFieldOptions(fieldId: string, data: any[], valueKey: string, labelKey: string) {
    this.currentSchema.update(schema => {
      if (!schema) return schema;
      const fieldIndex = schema.fields.findIndex(f => f.id === fieldId);
      if (fieldIndex > -1) {
        const newOptions = data.map(item => ({ value: item[valueKey], label: item[labelKey] }));
        schema.fields[fieldIndex] = { ...schema.fields[fieldIndex], options: newOptions };
      }
      return { ...schema, fields: [...schema.fields] };
    });
  }

  // =====================================================================
  // 3. REFACTORIZAMOS EL ONSUBMIT (Añadiendo Geolocalización)
  // =====================================================================

  async onSubmit(payload: Record<string, any>) {
    if (!this.codeTenant || !this.codeForm) return;

    let coords: { latitude: number, longitude: number, accuracy?: number } | null = null;

    try {
      // NOTA: Ajusta "getPosition()" o "getCurrentPosition()" al nombre real del método 
      // que tengas definido dentro de tu geolocalization.service.ts
      const position: any = await this.geoService.getPosition(); // Suponiendo que retorna una Promise con el objeto GeolocationPosition

      // Extraemos solo lo necesario para no enviar un objeto muy pesado
      coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy, // Opcional, pero útil para saber qué tan exacto es el GPS
      };
    } catch (error) {
      // Silenciamos el error si el usuario rechaza los permisos o no tiene GPS.
      // ¡Lo más importante es NO bloquear el envío del formulario!
      console.warn('Geolocalización no disponible o permiso denegado:', error);
    }

    // Enviamos el payload al facade, adjuntando las coordenadas en la metadata
    this.submissionFacade.submit(this.codeTenant, this.codeForm, payload, {
      metadata: {
        userAgent: navigator.userAgent,
        source: `/public/${this.codeTenant}/${this.codeForm}`,
        location: coords, // <-- Aquí inyectamos el JSON de la ubicación (o null)
      },
    });
  }

  goBack() {
    this.location.back();
  }

  closePolicyModal() {
    this.isPolicyModalOpen.set(false);
  }

  onFieldLabelAction(action: FieldLabelActionConfig): void {
    if (action.labelId === 'dataPolicyConsentAction') {
      if (action.url) {
        window.open(action.url, '_blank', 'noopener,noreferrer');
      }
    }
  }
}