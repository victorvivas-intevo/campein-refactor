import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-skeleton',
  templateUrl: 'skeleton.html',
  imports: [CommonModule],
})
export class Skeleton {
  @Input() isLoading: boolean = false;
  
  // Diferentes apariencias dependiendo de lo que estemos cargando
  @Input() type: 'card' | 'text' | 'list' | 'avatar' = 'text';
  
  // Para repetir el skeleton varias veces (ej: simulando una lista de 5 ítems)
  @Input() count: number = 1;

  // Genera un array iterativo para el HTML
  get items() {
    return Array(this.count).fill(0);
  }
}