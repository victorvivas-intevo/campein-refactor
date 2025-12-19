// checkbox-field.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  FormFieldConfig,
  FieldLabelConfig,
  FieldLabelActionConfig,
} from '../../form-control.types';

@Component({
  standalone: true,
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.html',
  styleUrls: ['./checkbox-field.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CheckboxField {
  @Input() config!: FormFieldConfig;
  @Input() control!: FormControl;

  @Output() labelAction = new EventEmitter<FieldLabelActionConfig>();

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  isSimpleLabel(label: FormFieldConfig['label']): label is string {
    return typeof label === 'string';
  }

  asLabelConfig(label: FormFieldConfig['label']): FieldLabelConfig {
    if (typeof label === 'string') {
      return { text: label };
    }
    return label;
  }

  onLabelActionClick(action: FieldLabelActionConfig): void {
    this.labelAction.emit(action);
  }
}
