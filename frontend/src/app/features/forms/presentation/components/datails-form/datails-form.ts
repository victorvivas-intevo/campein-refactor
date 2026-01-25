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

}
