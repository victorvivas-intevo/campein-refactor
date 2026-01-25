import { Type } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  iconClass?: string;
  badge?: string | number;
  component: Type<any>; // El componente que se renderizará
  inputs?: Record<string, any>; // Datos que el componente necesite
}