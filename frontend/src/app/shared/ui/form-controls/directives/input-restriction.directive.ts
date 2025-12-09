
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { InputRestriction } from '../form-control.types';

@Directive({
  standalone: true,
  selector: 'input[appInputRestriction],textarea[appInputRestriction]',
})
export class InputRestrictionDirective {
  @Input() appInputRestriction?: InputRestriction;

  constructor(
    private el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (!this.appInputRestriction) return;

    const element = this.el.nativeElement;
    const originalValue = element.value;
    let sanitized = originalValue;

    if (this.appInputRestriction === 'digits') {
      // solo dígitos
      sanitized = originalValue.replace(/\D+/g, '');
    }

    if (this.appInputRestriction === 'textNoSpecials') {
      // letras (incluye acentos), ñ/Ñ y espacios
      sanitized = originalValue.replace(/[^A-Za-zÀ-ÿ\u00f1\u00d1\s]/g, '');
    }

    if (sanitized !== originalValue) {
      element.value = sanitized;

      // Forzar a Angular a enterarse del cambio
      const newEvent = new Event('input', { bubbles: true });
      element.dispatchEvent(newEvent);
    }
  }
}
