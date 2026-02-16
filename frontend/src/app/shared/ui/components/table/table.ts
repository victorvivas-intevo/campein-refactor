import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableColumn, TableConfig, TableRowAction } from '@/shared/interfaces/table';

type RowId = string | number;

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styles: ``,
})
export class Table<T = any> implements OnChanges {
  @Input() styles: string = '';
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];

  @Input() config: TableConfig = {
    sortable: true,
    pagination: {
      enabled: false,
      pageSize: 10,
    },
  };

  @Input() rowActions: TableRowAction<T>[] = [];

  @Input() selectable = true;

  @Input() rowIdKey: keyof T | ((row: T) => RowId) = 'id' as keyof T;

  @Output() rowSelected = new EventEmitter<T | null>();
  @Output() rowAction = new EventEmitter<{ actionId: string; row: T }>();
  
  // NUEVO: Emisor para notificar si se requiere saber externamente que cambió el límite
  @Output() pageSizeChange = new EventEmitter<number>();

  sortColumnId: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  currentPage = 1;
  totalPages = 1;
  displayRows: T[] = [];

  selectedRowId: RowId | null = null;

  // NUEVO: Opciones por defecto para el selector de registros por página
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['columns'] || changes['config']) {
      this.currentPage = 1;
      this.recalculate();
    }
  }

  private getRowId(row: T): RowId {
    if (typeof this.rowIdKey === 'function') return this.rowIdKey(row);
    return (row as any)[this.rowIdKey] as RowId;
  }

  isSelected(row: T): boolean {
    return this.selectedRowId !== null && this.getRowId(row) === this.selectedRowId;
  }

  private selectRow(row: T): void {
    const id = this.getRowId(row);

    if (this.selectedRowId === id) {
      this.clearSelection();
      return;
    }
    
    this.selectedRowId = id;
    this.rowSelected.emit(row);
  }

  clearSelection(): void {
    this.selectedRowId = null;
    this.rowSelected.emit(null);
  }

  onRowActionClick(action: TableRowAction<T>, row: T, ev?: MouseEvent): void {
    ev?.stopPropagation();

    if (action.show && !action.show(row)) return;

    if (action.selectsRow) {
      this.selectRow(row);
    }

    this.rowAction.emit({ actionId: action.id, row });
  }

  // ───────────── SORT ─────────────

  isSortable(column: TableColumn<T>): boolean {
    if (this.config.sortable === false) return false;
    return column.sortable !== false;
  }

  onHeaderClick(column: TableColumn<T>): void {
    if (!this.isSortable(column)) return;

    const colId = String(column.id);

    if (this.sortColumnId !== colId) {
      this.sortColumnId = colId;
      this.sortDirection = 'asc';
    } else {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortColumnId = null;
        this.sortDirection = null;
      } else {
        this.sortDirection = 'asc';
      }
    }

    this.currentPage = 1;
    this.recalculate();
  }

  getSortIconClass(column: TableColumn<T>): string {
    const colId = String(column.id);

    if (this.sortColumnId !== colId || !this.sortDirection) {
      return 'fa-solid fa-arrow-up-wide-short';
    }

    return this.sortDirection === 'asc' ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
  }

  private sortData(rows: T[]): T[] {
    if (!this.sortColumnId || !this.sortDirection) return rows;

    const directionFactor = this.sortDirection === 'asc' ? 1 : -1;
    const column = this.columns.find((c) => String(c.id) === this.sortColumnId);
    if (!column) return rows;

    const colId = String(column.id);

    return [...rows].sort((a: any, b: any) => {
      const aValue = a[colId];
      const bValue = b[colId];

      if (aValue == null && bValue != null) return -1 * directionFactor;
      if (aValue != null && bValue == null) return 1 * directionFactor;
      if (aValue == null && bValue == null) return 0;

      if (column.type === 'number') {
        const aNum = typeof aValue === 'number' ? aValue : parseFloat(aValue);
        const bNum = typeof bValue === 'number' ? bValue : parseFloat(bValue);

        if (isNaN(aNum) && !isNaN(bNum)) return -1 * directionFactor;
        if (!isNaN(aNum) && isNaN(bNum)) return 1 * directionFactor;
        if (isNaN(aNum) && isNaN(bNum)) return 0;

        return aNum > bNum ? 1 * directionFactor : aNum < bNum ? -1 * directionFactor : 0;
      }

      if (column.type === 'date') {
        const aTime =
          aValue instanceof Date ? aValue.getTime() : new Date(aValue as string).getTime();

        const bTime =
          bValue instanceof Date ? bValue.getTime() : new Date(bValue as string).getTime();

        if (isNaN(aTime) && !isNaN(bTime)) return -1 * directionFactor;
        if (!isNaN(aTime) && isNaN(bTime)) return 1 * directionFactor;
        if (isNaN(aTime) && isNaN(bTime)) return 0;

        return aTime > bTime ? 1 * directionFactor : aTime < bTime ? -1 * directionFactor : 0;
      }

      const aStr = String(aValue).toLocaleLowerCase();
      const bStr = String(bValue).toLocaleLowerCase();

      if (aStr > bStr) return 1 * directionFactor;
      if (aStr < bStr) return -1 * directionFactor;
      return 0;
    });
  }

  // ───────────── PAGINACIÓN ─────────────

  private paginateData(rows: T[]): T[] {
    const pagination = this.config.pagination;
    if (!pagination?.enabled) {
      this.totalPages = 1;
      return rows;
    }

    const pageSize = pagination.pageSize ?? 10;
    const totalItems = rows.length;

    this.totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const start = (this.currentPage - 1) * pageSize;
    const end = start + pageSize;

    return rows.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.recalculate();
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  // NUEVO: Método para cambiar la cantidad de registros por página
  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = Number(target.value);
    
    if (this.config.pagination) {
      this.config.pagination.pageSize = newSize;
    }
    
    this.currentPage = 1; 
    this.pageSizeChange.emit(newSize); // Emitimos al padre por si acaso
    this.recalculate();
  }

  private recalculate(): void {
    const sorted = this.sortData(this.data ?? []);
    this.displayRows = this.paginateData(sorted);
  }

  // ───────────── ACCIONES ─────────────

  shouldShowAction(action: TableRowAction<T>, row: T): boolean {
    return action.show ? action.show(row) : true;
  }

  getCellAlignClass(column: TableColumn<T>): string {
    switch (column.align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  }

  // ───────────── UTILITIES ─────────────
  getCellValue(row: T, column: TableColumn<T>): string {
    const key = column.id as keyof T;
    const value = (row as any)[key];
    if (value === null || value === undefined) return '';
    return String(value);
  }

  getCellValueRaw(row: T, column: TableColumn<T>): any {
    const key = column.id as keyof T;
    return (row as any)[key];
  }
}