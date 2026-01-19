import { GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-version',
  imports: [CommonModule],
  templateUrl: './list-version.html',
  styles: ``,
})
export class ListVersion {
  @Input() idForm?: string;
  @Input() versions?: GetFormVersionDTO[];

  constructor(private router: Router, private route: ActivatedRoute){
  }

  viewVersion(id: string): void {
    this.router.navigate(['/app/forms/view-schema', this.idForm,id]);
  }
}
