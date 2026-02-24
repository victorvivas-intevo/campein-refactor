import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Menu } from "../menu/menu";
import { SESSION_STORE_TOKEN } from '@/features/auth/application/interfaces/session-store.interface';
import { MenuInterface } from '@/shared/interfaces/menu';
import { ItemMenu } from "../item-menu/item-menu";
import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';

const privilegesAdmin: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA']
const privilegesAll: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA', 'LIDER_ALFA']

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, Menu, ItemMenu],
  templateUrl: './side-bar.html',
  styles: ``,
})
export class SideBar {
  authFecade = inject(AuthFacade)
  private currentRole = this.authFecade.session()?.user.role;

  // Defines tu menú completo en crudo
  private rawMenu: MenuInterface[] = [
    { publicName: 'Dashboard', route: '/app/dashboard', icon: 'fa-regular fa-house' },
    { publicName: 'Usuarios', route: '/app/users', icon: 'fa-regular fa-user', roles: privilegesAll },
    { publicName: 'Formularios', route: '/app/forms', icon: 'fa-regular fa-file-alt' },
    { publicName: 'Notificaciones', route: '/app/notifications', icon: 'fa-regular fa-bell', roles: privilegesAdmin },
    { publicName: 'Voluntariado Duque', route: '/app/duque-volunteers', icon: 'fa-regular fa-map', roles: privilegesAdmin },
    { publicName: 'Voluntariado Fico', route: '/app/fico-volunteers', icon: 'fa-regular fa-map', roles: privilegesAdmin },
    { publicName: 'Estadisticas electorales', route: '/app/election-statistics', icon: 'fa-regular fa-map', roles: privilegesAdmin },
    { publicName: 'Paloma Valencia', route: '/app/analytical/paloma-valencia', icon: 'fa-regular fa-map', roles: privilegesAdmin },
    { publicName: 'Redes sociales', route: '/app/analytical/social-network-comparative', icon: 'fa-regular fa-map', roles: privilegesAdmin },
  ];

  logoutItem: MenuInterface = { publicName: 'Salir', route: '/auth/login/', icon: 'fa-solid fa-arrow-right-from-bracket' }

  // Angular se encarga de calcular automáticamente qué ítems debe mostrar
  // usando Signals (computed) o simplemente un getter.
  filteredMenu = computed(() => {
    return this.rawMenu.filter(item => {
      // Si no tiene restricción de roles, pasa. Si tiene, evaluamos el rol actual.
      return !item.roles || item.roles.includes(this.currentRole ?? '');
    });
  });

  logout(): void {
    this.authFecade.logout()
  }

}
