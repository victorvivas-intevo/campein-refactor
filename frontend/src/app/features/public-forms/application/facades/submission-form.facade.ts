
import { Injectable, signal, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '@/shared/services/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class SubmissionFormFacade {

    private toast = inject(ToastService);

    tenants = signal<any[] | null>(null);

    currentTenant = signal<any | null>(null);

    // formsCurrentTenant = signal<PublicFormsDto[]>([]);

    loading = signal(false);

    constructor(
      // private readonly getFormsByTenantUseCase: GetFormsByTenantUseCase,
    ) {

    }

    
}