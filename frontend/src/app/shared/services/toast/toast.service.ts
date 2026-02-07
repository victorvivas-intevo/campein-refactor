import { Injectable, signal } from '@angular/core';
import { 
  faCheckCircle, 
  faInfoCircle, 
  faExclamationTriangle, 
  faTimesCircle,
  IconDefinition 
} from '@fortawesome/free-solid-svg-icons';

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  icon: IconDefinition; // Agregamos la propiedad de icono
  duration?: number;
  leaving?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);
  private counter = 0;

  // Mapeo de iconos por variante
  private icons: Record<ToastVariant, IconDefinition> = {
    success: faCheckCircle,
    info: faInfoCircle,
    warning: faExclamationTriangle,
    error: faTimesCircle,
  };

  show(message: string, variant: ToastVariant = 'info', duration: number = 5000) {
    const id = this.counter++;
    const newToast: Toast = { 
      id, 
      message, 
      variant, 
      icon: this.icons[variant], // Asignamos el icono según la variante
      duration,
      leaving: true
    };
    
    this.toasts.update((current) => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: number) {
    this.toasts.update((current) =>
      current.map(t =>
        t.id === id ? { ...t, leaving: false } : t
      )
    );

    setTimeout(() => {
      this.toasts.update((current) =>
        current.filter(t => t.id !== id)
      );
    }, 300);
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string) { this.show(msg, 'error'); }
  warning(msg: string) { this.show(msg, 'warning'); }
  info(msg: string) { this.show(msg, 'info'); }
}