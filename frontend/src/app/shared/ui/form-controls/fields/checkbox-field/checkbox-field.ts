// checkbox-field.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig } from '../../form-control.types';

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
}
