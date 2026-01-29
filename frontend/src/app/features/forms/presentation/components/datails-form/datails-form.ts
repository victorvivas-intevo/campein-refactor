import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datails-form',
  imports: [CommonModule],
  templateUrl: './datails-form.html',
  styles: ``,
})
export class DatailsForm {
  @Input() form?: GetFormDTO;

  copyUrl(): void {
    const url = `${window.location.origin}/${this.form?.isPublic ? 'public-form':'app/forms/sendSubmission'}/${this.form?.code}`;
    navigator.clipboard.writeText(url).then(() => {
      // TODO: mostrar un toast o notificacion
      // alert('URL copiada al portapapeles');
    });
  }

}
