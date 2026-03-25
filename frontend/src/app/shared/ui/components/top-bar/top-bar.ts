import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';
import { Component, computed, inject } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styles: ``,
})
export class TopBar {
  private readonly authFacade = inject(AuthFacade);

  readonly session = this.authFacade.session;

  private readonly roleDictionary: Record<string, string> = {
    'ADMIN_SISTEMA': 'Adm. sistema',
    'ADMIN_CAMPAÑA': 'Adm. campaña', // Añade los tuyos
    'VOLUNTARIO': 'Voluntario',
    'LIDER': 'Líder de zona'
  };
  
  // Accedemos a la sesión actual como una señal (o un observable, según la implementación)

  readonly displayRole = computed(() => {
    // Asegúrate de que la ruta 'user.role' coincida con tu entidad User real
    const currentRole = this.session()?.user?.role; 
    
    if (!currentRole) return 'Cargando...';
    
    // Devuelve el rol traducido, o el rol original si no está en el diccionario
    return this.roleDictionary[currentRole] || currentRole; 
  });

}
