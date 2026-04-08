import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


// TODO: Terminar de implementar el servicio de temas para tenants. Esto implica definir un DTO que represente los colores o estilos que cada tenant puede tener, y luego aplicar esos estilos dinámicamente en la aplicación. La idea es que cada tenant pueda tener una apariencia personalizada sin afectar a los demás tenants.
// Interfaz sugerida para tu DTO del Tenant
export interface TenantTheme {
  primary: string;
  secondary: string;
  tertiary?: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  applyTenantTheme(theme: TenantTheme) {
    const root = this.document.documentElement;
    
    // Sobrescribimos las variables CSS en el navegador en milisegundos
    if (theme.primary) {
      root.style.setProperty('--tenant-primary', theme.primary);
    }
    if (theme.secondary) {
      root.style.setProperty('--tenant-secondary', theme.secondary);
    }
    if (theme.tertiary) {
      root.style.setProperty('--tenant-tertiary', theme.tertiary);
    }
  }

  resetToDefault() {
    const root = this.document.documentElement;
    root.style.removeProperty('--tenant-primary');
    root.style.removeProperty('--tenant-secondary');
    root.style.removeProperty('--tenant-tertiary');
  }
}