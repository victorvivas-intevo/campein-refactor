import { Component, Input } from '@angular/core';
import { ItemMenu } from "../item-menu/item-menu";
import { MenuInterface } from '@/shared/interfaces/menu';

const MENU_ITEMS: MenuInterface[] = [
  { publicName: 'Dashboard', route: '/app/dashboard', icon: 'fa-house' },
  { publicName: 'Usuarios', route: '/app/users', icon: 'fa-user' },
  { publicName: 'Formularios', route: '/app/forms', icon: 'fa-file-alt' },
  { publicName: 'Notificaciones', route: '/app/notifications', icon: 'fa-bell' },
  { publicName: 'Voluntariado Duque', route: '/app/duque-volunteers', icon: 'fa-regular fa-map' },
  { publicName: 'Volunmtariado Fico', route: '/app/fico-volunteers', icon: 'fa-regular fa-map' },
  { publicName: 'Estadisticas electorales', route: '/app/election-statistics', icon: 'fa-regular fa-map' },
];

@Component({
  selector: 'app-menu',
  imports: [ItemMenu],
  templateUrl: './menu.html',
  styles: ``,
})
export class Menu {
  @Input() items: MenuInterface[] = [];

}
