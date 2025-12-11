import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig } from '../../form-control.types';

interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  standalone: true,
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class AutocompleteField {
  @Input() config!: FormFieldConfig;
  @Input() control!: FormControl;

  /** Texto que el usuario escribe para filtrar opciones */
  searchTerm = '';

  /** Control de visibilidad del dropdown */
  isOpen = false;

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  get options(): SelectOption[] {
    return this.config.options ?? [];
  }

  /** Label que se muestra en el input cuando hay un valor seleccionado */
  get displayValue(): string {
    const value = this.control.value;
    if (!value) return '';

    const found = this.options.find((opt) => opt.value === value);
    return found ? found.label : '';
  }

  /** Opciones filtradas según lo que escriba el usuario */
  get filteredOptions(): SelectOption[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      // si no hay búsqueda, mostramos un subset para no explotar
      return this.options;
    }

    return this.options
      .filter((opt) => opt.label.toLowerCase().includes(term))
      .slice(0, 20);
  }

  onInput(term: string): void {
    this.searchTerm = term;
    this.isOpen = true;
  }

  onFocus(): void {
    this.isOpen = true;
    // sincronizamos el texto con el label de la opción seleccionada
    this.searchTerm = this.displayValue || '';
  }

  onBlur(): void {
    // pequeño delay para permitir click en opción antes de cerrar
    setTimeout(() => {
      this.isOpen = false;
    }, 150);
  }

  selectOption(option: SelectOption): void {
    this.control.setValue(option.value);
    this.control.markAsDirty();
    this.control.markAsTouched();

    this.searchTerm = option.label;
    this.isOpen = false;
  }

  clear(): void {
    this.control.setValue(null);
    this.control.markAsDirty();
    this.control.markAsTouched();

    this.searchTerm = '';
  }
}
