import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig, FieldValidatorConfig } from '../../form-control.types';
import { InputRestrictionDirective } from '../../directives/input-restriction.directive';

@Component({
  standalone: true,
  selector: 'app-text-field',
  templateUrl: './text-field.html',
  styleUrls: ['./text-field.css'],
  imports: [CommonModule, ReactiveFormsModule, InputRestrictionDirective],
})
export class TextField {
  @Input() config!: FormFieldConfig;
  @Input() control!: FormControl;

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  /**
   * Mensaje de error específico para el validador "pattern".
   * Si no hay mensaje configurado en el schema, devolvemos null.
   */
  get patternErrorMessage(): string | null {
    const validators: FieldValidatorConfig[] | undefined = this.config.validators;
    if (!validators) return null;

    const patternValidator = validators.find((v) => v.type === 'pattern');
    return patternValidator?.message ?? null;
  }
}
