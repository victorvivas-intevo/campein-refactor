// shared/ui/components/button/button.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'primary';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  imports: [CommonModule],
})
export class Button {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  /**
   * Callback opcional desde el padre.
   * Uso:
   *   <app-button [action]="onSave"></app-button>
   */
  @Input() action?: () => void;

  /**
   * Evento estándar de Angular.
   * Uso:
   *   <app-button (clicked)="onSave()"></app-button>
   */
  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    // 1) Emitimos el evento para binding estándar
    this.clicked.emit(event);

    // 2) Ejecutamos callback si vino desde el padre
    if (this.action) {
      this.action();
    }
  }

  get hostClasses(): string[] {
    const classes: string[] = [];

    // Variantes
    if(this.disabled){
      classes.push(
        'bg-primary-red-600',
        'hover:bg-primary-red-400',
        'text-white',
        'focus:ring-primary-red-600'
      );
    }else{
      switch (this.variant) {
        case 'primary':
          classes.push(
            'bg-primary-red-600',
            'hover:bg-primary-red-400',
            'text-white',
            'focus:ring-primary-red-600'
          );
          break;
      }
    }


    // Tamaños
    switch (this.size) {
      case 'sm':
        classes.push('px-3', 'py-1.5', 'text-xs');
        break;
      case 'md':
        classes.push('px-4', 'py-2', 'text-sm');
        break;
      case 'lg':
        classes.push('px-5', 'py-2.5', 'text-base');
        break;
    }

    // Full width
    if (this.fullWidth) {
      classes.push('w-full');
    }

    // Base
    classes.push(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'font-medium',
      'transition',
      'duration-150',
      'ease-in-out',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-60',
      'disabled:pointer-events-none'
    );

    return classes;
  }
}
