import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { buttonVariants, TableColumn, TableConfig, TableRowAction } from '@/shared/interfaces/table';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from "@/shared/ui/components/table/table";
import { SESSION_STORE_TOKEN } from '@/features/auth/application/interfaces/session-store.interface';

@Component({
  selector: 'app-details-list-page',
  imports: [Table],
  templateUrl: './details-list-page.html',
  styles: ``,
})
export class DetailsListPage {

  session = inject(SESSION_STORE_TOKEN)

  @Input() row?: GetFormDTO;
  // @Input() idForm?: string;
  // @Input() versions?: GetFormVersionDTO[];

  columns: TableColumn<GetFormVersionDTO>[] = [
    {
      id: 'version',
      header: 'Version',
      type: 'text',
      formatter: (value: number) => (value ? 'V' + value : ''),
    },
    {
      id: 'submissionCount',
      header: 'Envios',
      type: 'number',
    },
    {
      id: 'isActive',
      header: 'Activa',
      type: 'number',
      cellClass: (value: boolean) => {
        return value
        ? 'text-green-700 bg-green-100 ring-1 ring-green-600/20' // Estilo Activo
        : 'text-red-700 bg-red-100 ring-1 ring-red-600/20'; // Estilo Inactivo
      },
      formatter: (value: boolean) => (value ? 'Activa' : 'Inactiva'),
    },
    { id: 'createdAt', header: 'Fecha', type: 'date' },
  ];

  tableConfig: TableConfig = {
    sortable: false,
    pagination: {
      enabled: false,
    },
  };

  rowActions: TableRowAction<GetFormVersionDTO>[] = [
    {
      id: 'view',
      label: 'Ver',
      iconClass: 'fa-regular fa-eye',
      variant: buttonVariants.find((e) => e.variant == 'ghost'),
      selectsRow: false,
      show: (row) => { 
        const role = this.session.getRoleId()
        if(role === 'LIDER_BETA' || role === 'LIDER_ALFA') {
          return row.isActive
        }
        return true
      }
    },
  ];

  constructor(private router: Router) {}


  get versionActive(): GetFormVersionDTO | null {
    return this.row?.versions?.find((e)=>{
      return e.isActive
    }) || null
  }

  viewVersion(id: string): void {
    this.router.navigate(['/app/forms/view-schema', this.row?.id, id]);
  }

  onRowAction(event: { actionId: string; row: GetFormVersionDTO }): void {
    if (event.actionId === 'view') this.viewVersion(event.row.id);
  }

}
