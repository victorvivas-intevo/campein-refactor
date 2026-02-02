import { GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { DynamicForm } from '@/shared/ui/form-controls/dynamic-form/dynamic-form';
import { FormSchema } from '@/features/public-form/domain/types/public-form.types';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { Card } from "@/shared/ui/components/card/card";

@Component({
  selector: 'app-preview-form',
  imports: [CommonModule, DynamicForm, Card],
  templateUrl: './preview-form.html',
  styles: ``,
})
export class PreviewForm {
  
  @ViewChild(DynamicForm)
  dynamicForm!: DynamicForm;

  // estado
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  formSchema = signal<FormSchema | null>(null);

  @ViewChild('pageTop')
  pageTop!: ElementRef<HTMLDivElement>;

  @Input({ required: true, alias: 'schema' }) 
  set setSchema(value: FormSchema | null) {
    if (value) {
      this.formSchema.set(value);
      this.loading.set(false); // Deja de cargar cuando hay datos
    } else {
      this.loading.set(true);
    }
  }

  handleFormSubmit(data: Record<string, any>): void {
    console.log('Formulario enviado desde preview:', data);
    this.scrollToTop();
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

}
