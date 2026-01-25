import { GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-version-list',
  imports: [CommonModule],
  templateUrl: './view-version-list.html',
  styles: ``,
})
export class ViewVersionList implements OnChanges {
  @Input() versionActive?: string;
  @Input() versions: GetFormVersionDTO[] = [];

  @Output() versionSelected = new EventEmitter<GetFormVersionDTO>();


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  isActive(version: GetFormVersionDTO): boolean {
    return version.id === this.versionActive;
  }

  isLastVersion(version: GetFormVersionDTO): boolean {
    return this.versions.length > 0 && version.id === this.versions[0].id;
  }

  viewVersion(version: GetFormVersionDTO){
    this.versionSelected.emit(version);
  }
}
