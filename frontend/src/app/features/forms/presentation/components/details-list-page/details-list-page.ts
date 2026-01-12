import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-list-page',
  imports: [],
  templateUrl: './details-list-page.html',
  styles: ``,
})
export class DetailsListPage {
  @Input() row?: GetFormDTO;

  get versionActive(): GetFormVersionDTO | null {
    return this.row?.versions?.find((e)=>{
      return e.isActive
    }) || null
  }

}
