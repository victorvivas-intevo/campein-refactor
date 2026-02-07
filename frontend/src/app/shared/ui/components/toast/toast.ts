import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importante
import { ToastService, ToastVariant } from '@/shared/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toast.html',
})
export class ToastComponent {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  getVariantClasses(variant: ToastVariant): string {
    const classes = {
      success: 'bg-green-50 border-green-600 text-green-600',
      error: 'bg-red-50 border-red-600 text-primary-red-600',
      warning: 'bg-orange-50 border-orange-500 text-orange-600',
      info: 'bg-custom-bg-100 border-purple-heart-600 text-purple-heart-600'
    };
    return classes[variant];
  }
}