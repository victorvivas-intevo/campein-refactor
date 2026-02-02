import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-steb-by-steb',
  imports: [CommonModule],
  templateUrl: './steb-by-steb.html',
  styles: ``,
})
export class StebBySteb {
  // Recibe la lista de nombres de los pasos. Ej: ['Audience', 'Message', 'Stats']
  @Input() steps: string[] = [];
  
  // Recibe el número del paso actual (empieza en 0)
  @Input() currentStep: number = 0;

  // Opcional: Si quieres que los pasos sean clicables
  @Output() changeStep = new EventEmitter<number>();

  selectStep(index: number) {
    // Solo permitimos navegar a pasos ya completados o el siguiente inmediato (opcional)
    // O simplemente emitimos el evento:
    this.changeStep.emit(index);
  }

}
