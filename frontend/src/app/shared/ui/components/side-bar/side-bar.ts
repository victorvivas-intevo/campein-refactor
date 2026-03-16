import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Menu } from "../menu/menu";
import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';
import { MenuInterface } from '@/shared/interfaces/menu';
import { ItemMenu } from "../item-menu/item-menu";

const privilegesAdmin: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA'];
const privilegesAll: string[] = ['ADMIN_SISTEMA', 'ADMIN_CAMPANA', 'LIDER_ALFA'];

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, Menu, ItemMenu],
  templateUrl: './side-bar.html',
  styles: ``,
})
export class SideBar {
  authFecade = inject(AuthFacade);
  private currentRole = this.authFecade.session()?.user.role;

  private rawMenu: MenuInterface[] = [
    { publicName: 'Dashboard', route: '/app/dashboard', icon: 'fa-regular fa-house' },
    { publicName: 'Usuarios', route: '/app/users', icon: 'fa-regular fa-user', roles: privilegesAll },
    { publicName: 'Formularios', route: '/app/forms', icon: 'fa-regular fa-file-alt' },
    { publicName: 'Notificaciones', route: '/app/notifications', icon: 'fa-regular fa-bell', roles: privilegesAdmin },
    // Aquí agrupamos Analíticas en un dropdown
    {
      publicName: 'Analíticas',
      icon: 'fa-regular fa-chart-bar', // Icono para el padre
      roles: privilegesAdmin,
      children: [
        { publicName: 'Voluntariado Duque', route: '/app/duque-volunteers', icon: 'fa-regular fa-map', roles: privilegesAdmin },
        { publicName: 'Voluntariado Fico', route: '/app/fico-volunteers', icon: 'fa-regular fa-map', roles: privilegesAdmin },
        { publicName: 'Estadisticas electorales', route: '/app/election-statistics', icon: 'fa-regular fa-map', roles: privilegesAdmin },
        { publicName: 'Paloma Valencia', route: '/app/analytical/paloma-valencia', roles: privilegesAdmin },
        { publicName: 'Redes sociales', route: '/app/analytical/social-network-comparative', roles: privilegesAdmin },
        { publicName: 'Comparativa encuestadoras', route: '/app/analytical/survies-comparative', roles: privilegesAdmin },
      ]
    }
  ];

  logoutItem: MenuInterface = { publicName: 'Salir', route: '/auth/login/', icon: 'fa-solid fa-arrow-right-from-bracket' };

  filteredMenu = computed(() => {
    // Función auxiliar para validar roles
    const hasAccess = (item: MenuInterface): boolean => {
      return !item.roles || item.roles.includes(this.currentRole ?? '');
    };

    return this.rawMenu
      .filter(hasAccess)
      .map(item => {
        // Si el ítem tiene hijos, filtramos también a los hijos
        if (item.children) {
          return { ...item, children: item.children.filter(hasAccess) };
        }
        return item;
      });
  });

  logout(): void {
    this.authFecade.logout();
  }
}