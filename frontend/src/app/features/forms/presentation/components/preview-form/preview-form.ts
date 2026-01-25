import { GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { DynamicForm } from '@/shared/ui/form-controls/dynamic-form/dynamic-form';
import { FormSchema } from '@/features/public-form/domain/types/public-form.types';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, signal, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-preview-form',
  imports: [CommonModule, DynamicForm],
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
