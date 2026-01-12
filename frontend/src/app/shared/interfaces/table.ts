// src/app/shared/ui/components/table/table.types.ts

export type TableColumnAlign = 'left' | 'center' | 'right';
export type TableColumnType = 'text' | 'number' | 'date';

export interface TableColumn<T = any> {
  /** Propiedad del objeto row: 'email', 'fullName', etc. */
  id: keyof T | string;
  header: string;
  sortable?: boolean;
  align?: TableColumnAlign;
  type?: TableColumnType;
  /** Si quieres mostrar un ancho fijo/porcentaje */
  width?: string;
}

export interface TablePaginationConfig {
  enabled: boolean;
  pageSize?: number; // por defecto 10
}

export interface TableConfig {
  pagination?: TablePaginationConfig;
  /** Habilita/deshabilita sort globalmente, además de sortable por columna */
  sortable?: boolean;
}

export type TableRowActionVariant = 'primary' | 'ghost' | 'danger';

export interface TableRowAction<T = any> {
  id: string;
  label: string;
  iconClass?: string; // font awesome icon
  variant?: ButtonActionStyle;
  show?: (row: T) => boolean;
  selectsRow?: boolean;
}

export interface ButtonActionStyle {
  variant: TableRowActionVariant,
  classList: string
}

// Variantes de botones

export const buttonVariants: ButtonActionStyle[] = [
  {
    variant: 'primary',
    classList: `bg-green-400 hover:bg-green-300`,
  },
  {
    variant: 'danger',
    classList: `bg-red-400 hover:bg-red-300`,
  },
  {
    variant: 'ghost',
    classList: `bg-gray-400 hover:bg-gray-300`,
  },
]
