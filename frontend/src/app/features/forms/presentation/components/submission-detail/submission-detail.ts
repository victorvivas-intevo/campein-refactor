import { GetFormSubmissionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicSubmissionViewer } from "../dynamic-submission-viewer/dynamic-submission-viewer";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-submission-detail',
  imports: [DynamicSubmissionViewer, DatePipe],
  templateUrl: './submission-detail.html',
  styles: ``,
})
export class SubmissionDetail {
  @Input() item?: GetFormSubmissionDTO;
  @Input() schema?: any;
  @Output() close = new EventEmitter<void>();


  closeTab(): void {
    this.item = undefined;
    this.close.emit();
  }

}
