import { SESSION_STORE_TOKEN } from '@/features/auth/application/interfaces/session-store.interface';
import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { ToastService } from '@/shared/services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datails-form',
  imports: [CommonModule],
  templateUrl: './datails-form.html',
  styles: ``,
})
export class DatailsForm {

  toast = inject(ToastService)

  user = inject(SESSION_STORE_TOKEN)
  
  @Input() form?: GetFormDTO;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  copyUrl(): void {
    const url = `${window.location.origin}/${this.form?.isPublic ? 'public-form' : 'app/forms/sendSubmission'}/${this.form?.code}`;
    navigator.clipboard.writeText(url).then(() => {
      this.toast.success("Link copiado en porta papeles")
    });
  }

  enterToForm(): void {
    // const routeBase = this.form?.isPublic ? 'public-form' : 'app/forms/sendSubmission';
    this.router.navigate(['app/forms/sendSubmission', this.form?.code]);
  }
}
