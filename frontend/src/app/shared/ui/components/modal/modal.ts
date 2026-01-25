import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
  imports: [CommonModule],
})
export class Modal {
  /**
   * Controla si el modal está visible
   */
  @Input() isOpen = false;

  /**
   * Cierra el modal al hacer click en el backdrop
   */
  @Input() closeOnBackdrop = true;

  /**
   * Muestra botón de cerrar (X) arriba a la derecha
   */
  @Input() showCloseButton = true;

  /**
   * Tamaño del modal: ajusta el max-width
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Evento que se emite cuando el modal se cierra
   */
  @Output() closed = new EventEmitter<void>();

  get sizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'max-w-md';
      case 'lg':
        return 'max-w-4xl';
      case 'md':
      default:
        return 'max-w-2xl';
    }
  }

  onBackdropClick(): void {
    if (!this.closeOnBackdrop) return;
    this.close();
  }

  onCloseClick(): void {
    this.close();
  }

  close(): void {
    this.closed.emit();
  }

  // Esc para cerrar
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpen) {
      this.close();
    }
  }
}
