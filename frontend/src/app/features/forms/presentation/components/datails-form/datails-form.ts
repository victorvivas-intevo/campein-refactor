import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datails-form',
  imports: [CommonModule],
  templateUrl: './datails-form.html',
  styles: ``,
})
export class DatailsForm {
  @Input() form?: GetFormDTO;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  copyUrl(): void {
    const url = `${window.location.origin}/${this.form?.isPublic ? 'public-form' : 'app/forms/sendSubmission'}/${this.form?.code}`;
    navigator.clipboard.writeText(url).then(() => {
      // TODO: mostrar un toast o notificacion
      // alert('URL copiada al portapapeles');
    });
  }

  enterToForm(): void {
    const routeBase = this.form?.isPublic ? 'public-form' : 'app/forms/sendSubmission';
    this.router.navigate([routeBase, this.form?.code]);
  }
}
