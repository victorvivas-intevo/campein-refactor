import { Component } from '@angular/core';
import { ItemMenu } from "../item-menu/item-menu";
import { MenuInterface } from '@/shared/interfaces/menu';

const MENU_ITEMS: MenuInterface[] = [
  { publicName: 'Dashboard', route: '/app/dashboard', icon: 'fa-house' },
  { publicName: 'Usuarios', route: '/app/users', icon: 'fa-user' },
  { publicName: 'Formularios', route: '/app/forms', icon: 'fa-file-alt' },
  { publicName: 'Mapa de calor', route: '/app/map', icon: 'fa-regular fa-map' },
];

@Component({
  selector: 'app-menu',
  imports: [ItemMenu],
  templateUrl: './menu.html',
  styles: ``,
})
export class Menu {
  items: MenuInterface[] = MENU_ITEMS;

}
