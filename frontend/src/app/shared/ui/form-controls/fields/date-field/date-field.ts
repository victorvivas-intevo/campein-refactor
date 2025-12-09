// date-field.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig } from '../../form-control.types';

@Component({
  standalone: true,
  selector: 'app-date-field',
  templateUrl: './date-field.html',
  styleUrls: ['./date-field.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DateField {
  @Input() config!: FormFieldConfig;
  @Input() control!: FormControl;

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }
}
