import { Component } from '@angular/core';
import { Card } from "@/shared/ui/components/card/card";
import { Table } from "@/shared/ui/components/table/table";

@Component({
  selector: 'app-users.page',
  imports: [Card, Table],
  templateUrl: './users.page.html',
  styles: ``,
})
export class UsersPage {

}
