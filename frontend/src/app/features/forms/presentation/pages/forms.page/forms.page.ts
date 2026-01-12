import { Component, inject, OnInit } from '@angular/core';
import { Table } from "@/shared/ui/components/table/table";
import { FormFacade } from '@/features/forms/application/fecades/form.fecade';
import {
  TableColumn,
  TableConfig,
  TableRowAction,
  buttonVariants
} from '@/shared/interfaces/table';
import { GetFormDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Card } from "@/shared/ui/components/card/card";
import { DetailsListPage } from "../../components/details-list-page/details-list-page";

// interface UserRow {
//   id: string;
//   fullName: string;
//   email: string;
//   status: 'active' | 'inactive';
//   createdAt: string;
// }

@Component({
  selector: 'app-forms.page',
  imports: [Table, Card, DetailsListPage],
  templateUrl: './forms.page.html',
  styles: ``,
})
export class FormsPage implements OnInit {
  fecade = inject(FormFacade);
  items = this.fecade.items

  dataSource: GetFormDTO[] = []

  itemView?: GetFormDTO

  ngOnInit() {
    this.fecade.load().then(e => {
      this.dataSource = this.items()
    });
    // this.facade.load({ page: 1, pageSize: 10 }); // params
  }

  columns: TableColumn<GetFormDTO>[] = [
    { id: 'name', header: 'Nombre', sortable: true, type: 'text' },
    { id: 'code', header: 'Codigo', sortable: true, type: 'text' },
    { id: 'description', header: 'Descripción', sortable: true, type: 'text' },
    { id: 'submissionCount', header: 'Envíos', sortable: true, type: 'text' },
    { id: 'createdAt', header: 'Fecha de creación', sortable: true, type: 'date' },
  ];

  tableConfig: TableConfig = {
    sortable: true,
    pagination: {
      enabled: true,
      pageSize: 10,
    },
  };

  rowActions: TableRowAction<GetFormDTO>[] = [
    {
      id: 'version',
      label: 'Versiones',
      iconClass: 'fa-regular fa-eye',
      variant: buttonVariants.find(e => e.variant == 'ghost'),
      selectsRow: true
    },
    {
      id: 'edit',
      label: 'Editar',
      iconClass: 'fa-regular fa-pen-to-square',
      variant: buttonVariants.find(e => e.variant == 'primary'),
      selectsRow: false
    }
    // {
    //   id: 'disable',
    //   label: 'Inhabilitar',
    //   iconClass: 'fa-solid fa-ban',
    //   variant: buttonVariants.find(e => e.variant == 'danger'),
    //   show: (row) => row.status === 'active',
    // },
  ];

  onRowAction(event: { actionId: string; row: GetFormDTO }): void {
    if(event.actionId === 'version') this.viewVersions(event.row)
    if(event.actionId === 'edit') this.editForm(event.row)
  }

  viewVersions(row: GetFormDTO): void {
    console.log("viewVersions, ", row)
    // console.log(this.itemView)
  }
  
  editForm(row: GetFormDTO): void {
    console.log("editForm, ", row)
  }

}
