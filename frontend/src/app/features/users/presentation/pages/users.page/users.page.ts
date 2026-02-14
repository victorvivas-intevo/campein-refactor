import { Component, inject, OnInit } from '@angular/core';
import { Card } from '@/shared/ui/components/card/card';
// import { Table } from "@/shared/ui/components/table/table";
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

@Component({
  selector: 'app-users.page',
  imports: [Card, Skeleton, Table],
  templateUrl: './users.page.html',
  styles: ``,
})
export class UsersPage implements OnInit {
  toast = inject(ToastService);
  fecade = inject(UsersFacade);
  items = this.fecade.items;
  // dataSource: UserResponseDto[] = [];
  itemView?: UserResponseDto;

  // usersLoading = this.fecade.loading;

  tableLoading: boolean = true;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.tableLoading = true;
    this.fecade.load();
    this.tableLoading = false;
  }

  columns: TableColumn<UserResponseDto>[] = [
    { id: 'fullName', header: 'Nombre', sortable: true, type: 'text' },
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
      cellClass: (value: boolean) => {
        return value
          ? 'text-green-700 bg-green-100 ring-1 ring-green-600/20'
          : 'text-red-700 bg-red-100 ring-1 ring-red-600/20';
      },
    },
    // { id: 'submissionCount', header: 'Envíos', sortable: true, type: 'text' },
    // { id: 'createdAt', header: 'Fecha', sortable: true, type: 'date' },
  ];

  tableConfig: TableConfig = {
    sortable: true,
    pagination: {
      enabled: true,
      pageSize: 10,
    },
  };

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

  rowActions: TableRowAction<UserResponseDto>[] = [
    {
      id: 'version',
      label: 'Versiones',
      iconClass: 'fa-regular fa-eye',
      variant: buttonVariants.find((e) => e.variant == 'ghost'),
      selectsRow: true,
      activeIconClass: 'fa-regular fa-eye-slash',
      activeVariant: buttonVariants.find((e) => e.variant == 'close'),
    },
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
  ];

  onRowAction(event: { actionId: string; row: UserResponseDto }): void {
    if (event.actionId === 'version') this.viewVersions(event.row);
    if (event.actionId === 'edit') this.editForm(event.row);
  }

  viewVersions(row: UserResponseDto): void {
    console.log('viewVersions, ', row);
    // console.log(this.itemView)
  }

  editForm(row: UserResponseDto): void {
    console.log('editForm, ', row);
  }
}
