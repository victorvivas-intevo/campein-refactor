import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig } from '../../form-control.types';

@Component({
  standalone: true,
  selector: 'app-select-field',
  templateUrl: './select-field.html',
  styleUrls: ['./select-field.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SelectField {
  @Input() config!: FormFieldConfig;
  @Input() control!: FormControl;

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }
}
