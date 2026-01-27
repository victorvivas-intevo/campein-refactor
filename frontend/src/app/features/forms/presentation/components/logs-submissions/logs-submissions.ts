import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Table } from "@/shared/ui/components/table/table";
import { GetFormSubmissionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { buttonVariants, TableColumn, TableConfig, TableRowAction } from '@/shared/interfaces/table';

@Component({
  selector: 'app-logs-submissions',
  imports: [Table],
  templateUrl: './logs-submissions.html',
  styles: ``,
})
export class LogsSubmissions implements OnChanges {
  @Input() submissions?: GetFormSubmissionDTO[];
  @Input() formId?: string;

  itemView?: GetFormSubmissionDTO;

    columns: TableColumn<GetFormSubmissionDTO>[] = [
    {
      id: 'versionSubmited',
      header: 'Version',
      type: 'text',
      formatter: (value: number) => ('V' + value || ''),
    },
    {
      id: 'submittedAt',
      header: 'Fecha de envío',
      type: 'date',
      // formatter: (value: Date) => value.toLocaleDateString(),
    },
    // {
    //   id: 'isActive',
    //   header: 'Activa',
    //   type: 'number',
    //   cellClass: (value: boolean) => {
    //     return value
    //     ? 'text-green-700 bg-green-100 ring-1 ring-green-600/20' // Estilo Activo
    //     : 'text-red-700 bg-red-100 ring-1 ring-red-600/20'; // Estilo Inactivo
    //   },
    //   formatter: (value: boolean) => (value ? 'Activa' : 'Inactiva'),
    // },
    // { id: 'createdAt', header: 'Fecha', type: 'date' },
  ];

  tableConfig: TableConfig = {
    sortable: false,
    pagination: {
      enabled: false,
    },
  };

  rowActions: TableRowAction<GetFormSubmissionDTO>[] = [
    {
      id: 'view',
      label: 'Ver',
      iconClass: 'fa-regular fa-eye',
      variant: buttonVariants.find((e) => e.variant == 'ghost'),
      selectsRow: true,
    },
  ];

  // constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('Submissions changed:', this.submissions);
  }

  onRowAction(event: { actionId: string; row: GetFormSubmissionDTO }): void {
      if (event.actionId === 'version') this.viewVersions(event.row);
    }
  
    viewVersions(row: GetFormSubmissionDTO): void {
      console.log('view submission, ', row);
      // console.log(this.itemView)
    }
}
