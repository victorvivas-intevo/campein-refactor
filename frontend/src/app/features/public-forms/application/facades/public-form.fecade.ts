
import { Injectable, signal, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PublicFormsDto } from '../../domain/dtos/query.dtos';
import { GetFormsByTenantUseCase } from '../use-cases/getFormsByTenant.use-case';
import { ToastService } from '@/shared/services/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class PublicFormsFacade {

    private toast = inject(ToastService);

    tenants = signal<any[] | null>(null);

    currentTenant = signal<any | null>(null);

    formsCurrentTenant = signal<PublicFormsDto[]>([]);

    loading = signal(false);

    constructor(
        private readonly getFormsByTenantUseCase: GetFormsByTenantUseCase,
    ) {

    }

    async loadFormsByTenant(tenantCode: string) {
        this.loading.set(true);
        try {
            const forms = await firstValueFrom(this.getFormsByTenantUseCase.execute(tenantCode));
            this.formsCurrentTenant.set(forms);
        } catch(error) {
            console.error('Error loading forms by tenant:', error);
            this.toast.error('Error', 'No se pudieron cargar los formularios para la campaña seleccionada.');
        } finally {
            this.loading.set(false);
        }
    }

    
}