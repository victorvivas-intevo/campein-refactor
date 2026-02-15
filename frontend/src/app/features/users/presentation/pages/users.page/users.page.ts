import { Component, inject, OnInit, effect, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from '@/shared/ui/components/card/card';
import { ToastService } from '@/shared/services/toast/toast.service';
import { UsersFacade } from '@/features/users/application/fecades/user.fecade';
import { UserResponseDto } from '@/features/users/domain/dtos/user.dto';
import { Skeleton } from '@/shared/ui/components/skeleton/skeleton';
import { Table } from '@/shared/ui/components/table/table';
import {
  buttonVariants,
  TableColumn,
  TableConfig,
  TableRowAction,
} from '@/shared/interfaces/table';
import { SESSION_STORE_TOKEN } from '@/features/auth/application/interfaces/session-store.interface';

@Component({
  selector: 'app-users.page',
  imports: [Card, Skeleton, Table, FormsModule],
  templateUrl: './users.page.html',
  styles: ``,
})
export class UsersPage implements OnInit {
  toast = inject(ToastService);
  fecade = inject(UsersFacade);
  sessionStore = inject(SESSION_STORE_TOKEN);

  cdr = inject(ChangeDetectorRef);

  items = this.fecade.items;
  itemView?: UserResponseDto;

  filteredData: UserResponseDto[] = [];

  filters = {
    fullName: '',
    email: '',
    role: '',
    campain: '',
  };

  currentRole: string = '';

  columns: TableColumn<UserResponseDto>[] = [];
  rowActions: TableRowAction<UserResponseDto>[] = [];

  tableConfig: TableConfig = {
    sortable: true,
    pagination: {
      enabled: true,
      pageSize: 10,
    },
  };

  tableLoading: boolean = true;

  constructor() {
    effect(() => {
      const allData = this.items();
      this.filteredData = allData;
      this.applyFilters();
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.currentRole = this.sessionStore.getRoleId();
    this.buildTableUI();
    this.getUsers();
  }

  getUsers() {
    this.fecade.load().then(e => this.tableLoading = true).finally(() => this.tableLoading = false);
    
  }

  applyFilters(): void {
    const allData = this.items();

    this.filteredData = allData.filter((user) => {
      const matchName =
        !this.filters.fullName ||
        user.fullName?.toLowerCase().includes(this.filters.fullName.toLowerCase());

      const matchEmail =
        !this.filters.email ||
        (user as any).email?.toLowerCase().includes(this.filters.email.toLowerCase());

      const matchRole = !this.filters.role || user.role === this.filters.role;

      const matchCampaign =
        !this.filters.campain ||
        (user as any).campain?.toLowerCase().includes(this.filters.campain.toLowerCase());

      return matchName && matchEmail && matchRole && matchCampaign;
    });
  }

  clearFilters(): void {
    this.filters = { fullName: '', email: '', role: '', campain: '' };
    this.applyFilters();
  }

  private buildTableUI() {
    const currentRole = this.sessionStore.getRoleId();

    this.columns = [
      { id: 'fullName', header: 'Nombre', sortable: true, type: 'text' },
      { id: 'email', header: 'Usuario/Email', sortable: true, type: 'text' },
      {
        id: 'role',
        header: 'Rol',
        sortable: true,
        type: 'text',
        formatter: (value: string) => this.getRoleLabel(value),
        cellClass: (value: string) => this.getRoleClass(value),
      },
      {
        id: 'isActive',
        header: 'Estado',
        sortable: false,
        type: 'text',
        formatter: (value: boolean) => (value ? 'Activo' : 'Inactivo'),
        cellClass: (value: boolean) =>
          value
            ? 'text-green-700 bg-green-100 ring-1 ring-green-600/20'
            : 'text-red-700 bg-red-100 ring-1 ring-red-600/20',
      },
    ];

    this.rowActions = [
      {
        id: 'version',
        label: 'Ver formularios',
        iconClass: 'fa-regular fa-eye',
        variant: buttonVariants.find((e) => e.variant == 'ghost'),
        selectsRow: true,
      },
    ];

    if (currentRole === 'ADMIN_SISTEMA') {
      this.columns.push(
        {
          id: 'createdAt',
          header: 'Fecha de Creación',
          sortable: true,
          type: 'date',
        },
        {
          id: 'campain',
          header: 'Campaña',
          sortable: true,
          type: 'text',
          cellClass: () => {
            return 'font-semibold';
          },
        },
      );

      this.rowActions.push(
        {
          id: 'edit',
          label: 'Editar',
          iconClass: 'fa-regular fa-pen-to-square',
          variant: buttonVariants.find((e) => e.variant == 'primary'),
          selectsRow: false,
        },
        {
          id: 'disable',
          label: 'Inhabilitar',
          iconClass: 'fa-solid fa-diagram-project',
          variant: buttonVariants.find((e) => e.variant == 'ghost'),
        },
      );
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'ADMIN_SISTEMA':
        return 'Admin. Sistema';
      case 'ADMIN_CAMPANA':
        return 'Admin. Campaña';
      case 'LIDER_ALFA':
        return 'Líder Alfa';
      case 'LIDER_BETA':
        return 'Líder Beta';
      default:
        return 'Desconocido';
    }
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'ADMIN_SISTEMA':
        return 'text-violet-700 bg-violet-100 ring-1 ring-violet-600/20';
      case 'ADMIN_CAMPANA':
        return 'text-primary-green-700 bg-primary-green-100 ring-1 ring-primary-green-600/20';
      case 'LIDER_ALFA':
        return 'text-primary-red-700 bg-primary-red-100 ring-1 ring-primary-red-600/20';
      case 'LIDER_BETA':
        return 'text-blue-700 bg-blue-100 ring-1 ring-blue-600/20';
      default:
        return role;
    }
  }

  onRowAction(event: { actionId: string; row: UserResponseDto }): void {
    if (event.actionId === 'version') this.viewVersions(event.row);
    if (event.actionId === 'edit') this.editForm(event.row);
  }

  viewVersions(row: UserResponseDto): void {
    console.log('viewVersions, ', row);
  }

  editForm(row: UserResponseDto): void {
    console.log('editForm, ', row);
  }
}
