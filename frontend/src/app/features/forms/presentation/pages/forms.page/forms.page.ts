import { Component, inject, OnInit } from '@angular/core';
import { Table } from "@/shared/ui/components/table/table";
import { FormFacade } from '@/features/forms/application/fecades/form.fecade';

@Component({
  selector: 'app-forms.page',
  imports: [Table],
  templateUrl: './forms.page.html',
  styles: ``,
})
export class FormsPage implements OnInit {
  facade = inject(FormFacade);

  ngOnInit() {
    this.facade.load();
    // this.facade.load({ page: 1, pageSize: 10 }); // params
  }

}
