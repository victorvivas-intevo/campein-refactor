import { Component, Input } from '@angular/core';
import { ItemMenu } from "../item-menu/item-menu";
import { MenuInterface } from '@/shared/interfaces/menu';

@Component({
  selector: 'app-menu',
  imports: [ItemMenu],
  templateUrl: './menu.html',
  styles: ``,
})
export class Menu {
  @Input() items: MenuInterface[] = [];

}
