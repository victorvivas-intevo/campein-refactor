import { GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-version',
  imports: [CommonModule, /* RouterLink */],
  templateUrl: './list-version.html',
  styles: ``,
})
export class ListVersion {
  @Input() versions?: GetFormVersionDTO[]

  constructor(private router: Router, private route: ActivatedRoute){
  }

  viewVersion(id: string): void {
    // this.router.navigate(['/view-schema', id], { relativeTo: this.route });
    // this.router.navigate(['/view-schema', id]);
    this.router.navigate(['/app/forms/view-schema', id]);
    // `forms/view-schema/${item.id}`
  }
}
