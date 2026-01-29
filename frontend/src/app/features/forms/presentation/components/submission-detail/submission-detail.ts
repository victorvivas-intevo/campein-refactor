import { GetFormSubmissionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submission-detail',
  imports: [],
  templateUrl: './submission-detail.html',
  styles: ``,
})
export class SubmissionDetail {
  @Input() item?: GetFormSubmissionDTO;

}
