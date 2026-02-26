import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

export interface StepItem {
  label: string;
  description?: string;
}

@Component({
  selector: 'app-step-by-step',
  imports: [CommonModule],
  templateUrl: './step-by-step.html',
  styles: ``,
})
export class StepByStep {
  // Recibe la lista de nombres de los pasos. Ej: ['Audience', 'Message', 'Stats']
  // @Input() steps: StepItem[] = [];
  steps = input.required<StepItem[]>();
  
  // Recibe el número del paso actual (empieza en 0)
  currentStep = input<number>(0);
  
  // Recibe la orientación del componente (horizontal o vertical)
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  // Opcional: Si quieres que los pasos sean clicables
  @Output() changeStep = new EventEmitter<number>();

  selectStep(index: number) {
    // Solo permitimos navegar a pasos ya completados o el siguiente inmediato (opcional)
    // O simplemente emitimos el evento:
    this.changeStep.emit(index);
  }

}
