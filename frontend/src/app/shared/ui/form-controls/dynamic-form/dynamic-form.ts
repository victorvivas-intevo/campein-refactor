import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormSchema, FormFieldConfig, FieldValidatorConfig } from '../form-control.types';
import { CheckboxField } from '../fields/checkbox-field/checkbox-field';
import { DateField } from '../fields/date-field/date-field';
import { SelectField } from '../fields/select-field/select-field';
import { TelField } from '../fields/tel-field/tel-field';
import { TextField } from '../fields/text-field/text-field';
import { Button } from '../../components/button/button';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxField,
    DateField,
    SelectField,
    TelField,
    TextField,
    Button
  ],
})
export class DynamicForm implements OnChanges {
  @Input() schema!: FormSchema;
  @Output() submitted = new EventEmitter<Record<string, any>>();

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && this.schema) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const controls: Record<string, FormControl> = {};

    const sortedFields = [...this.schema.fields].sort(
      (a, b) => a.order - b.order,
    );

    for (const field of sortedFields) {
      const validators = this.mapValidators(field);
      controls[field.id] = this.fb.control('', validators);
    }

    this.form = this.fb.group(controls);
  }

  private mapValidators(field: FormFieldConfig) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.validators) {
      for (const v of field.validators) {
        validators.push(this.toAngularValidator(v));
      }
    }

    return validators;
  }

  private toAngularValidator(v: FieldValidatorConfig) {
    switch (v.type) {
      case 'email':
        return Validators.email;
      case 'minLength':
        return Validators.minLength(Number(v.value ?? 0));
      case 'maxLength':
        return Validators.maxLength(Number(v.value ?? 0));
      case 'pattern':
        return Validators.pattern(v.value as string);
      default:
        return Validators.nullValidator;
    }
  }

  onSubmit(): void {
    if (!this.form) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }

  // helper para layout
  get fieldsColumn1(): FormFieldConfig[] {
    return this.schema.fields
      .filter((f) => (f.column ?? 1) === 1)
      .sort((a, b) => a.order - b.order);
  }

  get fieldsColumn2(): FormFieldConfig[] {
    return this.schema.fields
      .filter((f) => (f.column ?? 1) === 2)
      .sort((a, b) => a.order - b.order);
  }

  getControl(id: string): FormControl {
    return this.form.get(id) as FormControl;
  }

  get isSubmitDisabled(): boolean {
    if (!this.form) return true;
    return this.form.invalid || this.form.pending;
  }
}
