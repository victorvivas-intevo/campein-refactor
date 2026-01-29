import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-submission-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-submission-viewer.html',
})
export class DynamicSubmissionViewer {
  /** El esquema del formulario (JSON que define los campos) */
  @Input() schema: any; 
  
  /** El objeto con los datos (item.payload) */
  @Input() data: any = {};

  /**
   * Obtiene la lista de componentes a renderizar.
   * Aplana el esquema si es necesario o retorna los componentes raíz.
   */
  get fields(): any[] {
    if (!this.schema || !this.schema.fields) return [];
    // Aquí podrías agregar lógica recursiva si tu esquema tiene columnas o paneles.
    // Por ahora asumimos una estructura plana o directa en 'components'.
    return this.schema.fields;
  }

  /**
   * Obtiene el valor formateado para mostrar
   */
  getValue(field: any): any {
    const key = field.id;
    const value = this.data[key];

    // 1. Si es nulo o indefinido
    if (value === null || value === undefined) {
      return '-';
    }

    // // 2. Manejo de Booleanos (Checkboxes, Switches)
    if (field.type === 'checkbox' || typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }

    // // 3. Manejo de Selects / Radio (Buscar el label si existe 'options')
    if ((field.type === 'select' || field.type === 'radio') && field.options) {
      const option = field.options.find((opt: any) => opt.value === value);
      return option ? option.label : value;
    }

    // 4. Retorno por defecto (Texto, Número, etc.)
    return value;
  }

  /**
   * Determina si el campo debe mostrarse (opcional: ocultar campos vacíos)
   */
  shouldShow(field: any): boolean {
    // Puedes personalizar esto para ocultar botones o elementos de diseño
    const nonDataTypes = ['button', 'htmlelement', 'content'];
    if (nonDataTypes.includes(field.type)) return false;
    return true;
  }
}