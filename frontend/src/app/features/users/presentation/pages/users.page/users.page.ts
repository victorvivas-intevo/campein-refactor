import { Component, inject, OnInit } from '@angular/core';
import { Card } from "@/shared/ui/components/card/card";
// import { Table } from "@/shared/ui/components/table/table";
import { ToastService } from '@/shared/services/toast/toast.service';

@Component({
  selector: 'app-users.page',
  imports: [Card],
  templateUrl: './users.page.html',
  styles: ``,
})
export class UsersPage implements OnInit {

  toast = inject(ToastService);

  ngOnInit(): void {
    this.toast.info('Cargando usuarios...', 'solicitando información');
  }
}
