import { GetFormSubmissionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submission-detail',
  imports: [],
  templateUrl: './submission-detail.html',
  styles: ``,
})
export class SubmissionDetail {
  @Input() item?: GetFormSubmissionDTO;
  @Output() close = new EventEmitter<void>();


  closeTab(): void {
    this.item = undefined;
    this.close.emit();
  }

}
