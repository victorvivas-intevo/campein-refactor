import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  FormSchema,
  FormFieldConfig,
  FieldValidatorConfig,
  FieldLabelActionConfig,
} from '../form-control.types';
import { CheckboxField } from '../fields/checkbox-field/checkbox-field';
import { DateField } from '../fields/date-field/date-field';
import { SelectField } from '../fields/select-field/select-field';
import { TelField } from '../fields/tel-field/tel-field';
import { TextField } from '../fields/text-field/text-field';
import { Button } from '../../components/button/button';
import { AutocompleteField } from '../fields/autocomplete-field/autocomplete-field';

import { Subject, takeUntil } from 'rxjs';

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
    AutocompleteField,
    TelField,
    TextField,
    Button,
  ],
})
export class DynamicForm implements OnChanges, OnInit, OnDestroy {
  @Input() schema!: FormSchema;
  @Input() loading: boolean = false;
  @Output() submitted = new EventEmitter<Record<string, any>>();
  @Output() fieldLabelAction = new EventEmitter<FieldLabelActionConfig>();

  // 1. CAMBIO: Ahora emitimos paramValue en lugar de url
  @Output() loadOptions = new EventEmitter<{ fieldId: string; paramValue: string }>();

  form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    // Si la inicialización del componente sucede después de OnChanges (seguridad)
    if (this.form && Object.keys(this.form.controls).length === 0) {
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && this.schema) {
      // 2. CAMBIO CRÍTICO: Solo construimos el formulario y sus dependencias si no existe.
      // Así evitamos borrar los datos del usuario cuando inyectamos nuevas opciones al schema
      if (!this.form) {
        this.initForm();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.buildForm();
    this.setupDependencies(); // Vinculamos la reactividad después de crear los controles
  }

  private buildForm(): void {
    const controls: Record<string, FormControl> = {};
    const sortedFields = [...this.schema.fields].sort((a, b) => a.order - b.order);

    for (const field of sortedFields) {
      const validators = this.mapValidators(field);
      
      // Si el campo depende de otro, debe nacer deshabilitado
      const initialState = { 
        value: '', 
        disabled: !!field.dependsOn 
      };
      
      controls[field.id] = this.fb.control(initialState, validators);
    }

    this.form = this.fb.group(controls);
  }

  private setupDependencies(): void {
    const dependentFields = this.schema.fields.filter((f) => !!f.dependsOn);

    dependentFields.forEach((childField) => {
      const parentControl = this.getControl(childField.dependsOn!);
      const childControl = this.getControl(childField.id);

      if (!parentControl || !childControl) return;

      parentControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((parentValue) => {
          // Si el padre cambia, limpiamos la selección anterior del hijo
          childControl.setValue('', { emitEvent: false });

          if (parentValue) {
            childControl.enable({ emitEvent: false });

            // 3. CAMBIO: Validamos que exista dataSource y emitimos el valor del padre
            // Ya no construimos la URL aquí, delegamos esa responsabilidad a la Fachada
            if (childField.dataSource) {
              this.loadOptions.emit({ 
                fieldId: childField.id, 
                paramValue: parentValue 
              });
            }
          } else {
            // Si el papá se queda vacío (limpiaron el select), volvemos a bloquear al hijo
            childControl.disable({ emitEvent: false });
          }
        });
    });
  }

  onFieldLabelAction(action: FieldLabelActionConfig): void {
    this.fieldLabelAction.emit(action);
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

  resetForm(): void {
    if (!this.form) return;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}