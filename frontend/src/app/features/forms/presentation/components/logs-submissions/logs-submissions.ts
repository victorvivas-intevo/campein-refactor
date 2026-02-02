import { Component, computed, inject, Input, OnChanges, signal, SimpleChanges, ViewChild } from '@angular/core';
import { Table } from '@/shared/ui/components/table/table';
import { GetFormSubmissionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import {
  buttonVariants,
  TableColumn,
  TableConfig,
  TableRowAction,
} from '@/shared/interfaces/table';
import { SubmissionDetail } from '../submission-detail/submission-detail';
import { FormFacade } from '@/features/forms/application/fecades/form.fecade';
import { FormSchema } from '@/features/public-form/domain/types/public-form.types';

@Component({
  selector: 'app-logs-submissions',
  imports: [Table, SubmissionDetail],
  templateUrl: './logs-submissions.html',
  styles: ``,
})
export class LogsSubmissions implements OnChanges {

  @ViewChild(Table) table!: Table<GetFormSubmissionDTO>;

  @Input() submissions?: GetFormSubmissionDTO[];
  
  
  @Input({ required: true, alias: 'formId' }) 
  set setFormId(value: string | null) {
    if (value) {
      this.formId = value;
      this.loading.set(false); // Deja de cargar cuando hay datos
    } else {
      this.loading.set(true);
    }
  }

  userFilter = signal<string>('');
  
  filteredSubmissions = computed(() => { //
    const filter = this.userFilter().toLowerCase().trim();
    if (!this.submissions) return [];
    if (!filter) return this.submissions;

    return this.submissions.filter(sub => 
      sub.submittedBy?.toLowerCase().includes(filter)
    );
  });

  onFilterChange(event: Event): void { //
    const input = event.target as HTMLInputElement;
    this.userFilter.set(input.value);
  }

  clearFilter(): void { //
    this.userFilter.set('');
  }
  
  formId?: string;

  // estado
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  formSchema = signal<FormSchema | null>(null);

  private formFacade = inject(FormFacade);

   @Input({ required: true, alias: 'schema' }) 
    set setSchema(value: FormSchema | null) {
      if (value) {
        this.formSchema.set(value);
        this.loading.set(false); // Deja de cargar cuando hay datos
      } else {
        this.loading.set(true);
      }
    }

  itemView?: GetFormSubmissionDTO;

  columns: TableColumn<GetFormSubmissionDTO>[] = [
    {
      id: 'versionSubmited',
      header: 'Version',
      type: 'text',
      formatter: (value: number) => 'V' + value || '',
    },
    {
      id: 'submittedBy',
      header: 'Usuario',
      type: 'text',
      formatter: (value: string) => value || 'Registro anónimo',
      cellClass: (value: boolean) => {
      return value
        ? 'text-green-700 bg-green-100 ring-1 ring-green-600/20' // Estilo Activo
        : 'text-red-700 bg-red-100 ring-1 ring-red-600/20'; // Estilo Inactivo
    },
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
      id: 'viewSubmission',
      label: 'Ver',
      iconClass: 'fa-regular fa-eye',
      variant: buttonVariants.find((e) => e.variant == 'ghost'),
      selectsRow: true,
      activeIconClass: 'fa-regular fa-eye-slash',
      activeVariant: buttonVariants.find((e) => e.variant == 'close')
    },
  ];

  get activeSchema() {
    return this.formFacade.currentSchema()?.schema;
  }

  // constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('Submissions changed:', this.submissions);
  }

  onRowAction(event: { actionId: string; row: GetFormSubmissionDTO }): void {
    if (event.actionId === 'viewSubmission') this.viewSubmission(event.row);
  }

  viewSubmission(row: GetFormSubmissionDTO): void {
    // logica especial para ver la submission si aplica
  }

  onCloseDetail(): void {
    this.itemView = undefined; // Oculta el panel
    
    // Verifica que la tabla exista antes de llamar al método (por seguridad)
    if (this.table) {
      this.table.clearSelection();
    }
  }
}
