import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Menu } from "../menu/menu";
import { SESSION_STORE_TOKEN } from '@/features/auth/application/interfaces/session-store.interface';
import { MenuInterface } from '@/shared/interfaces/menu';

const privilegesAdmin: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA']
const privilegesAll: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA', 'LIDER_ALFA']

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, Menu],
  templateUrl: './side-bar.html',
  styles: ``,
})
export class SideBar {

  private sessionStore = inject(SESSION_STORE_TOKEN);
  private currentRole = this.sessionStore.getRoleId();

  // Defines tu menú completo en crudo
  private rawMenu: MenuInterface[] = [
    { publicName: 'Dashboard', route: '/app/dashboard', icon: 'fa-house' },
    { publicName: 'Usuarios', route: '/app/users', icon: 'fa-user', roles: privilegesAll },
    { publicName: 'Formularios', route: '/app/forms', icon: 'fa-file-alt' },
    { publicName: 'Notificaciones', route: '/app/notifications', icon: 'fa-bell', roles: privilegesAdmin },
    { publicName: 'Voluntariado Duque', route: '/app/duque-volunteers', icon: 'fa-regular fa-map', roles: privilegesAdmin },
    { publicName: 'Volunmtariado Fico', route: '/app/fico-volunteers', icon: 'fa-regular fa-map', roles: privilegesAdmin },
    { publicName: 'Estadisticas electorales', route: '/app/election-statistics', icon: 'fa-regular fa-map', roles: privilegesAdmin },
  ];

  // Angular se encarga de calcular automáticamente qué ítems debe mostrar
  // usando Signals (computed) o simplemente un getter.
  filteredMenu = computed(() => {
    return this.rawMenu.filter(item => {
      // Si no tiene restricción de roles, pasa. Si tiene, evaluamos el rol actual.
      return !item.roles || item.roles.includes(this.currentRole);
    });
  });

}
