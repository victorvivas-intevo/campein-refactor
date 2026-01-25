import { TabItem } from '@/shared/interfaces/tabs';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styles: ``,
})
export class Tabs {
  @Input() tabs: TabItem[] = [];
  
  activeTabId: string = '';

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.activeTabId = this.tabs[0].id;
    }
  }

  get activeTab() {
    return this.tabs.find(t => t.id === this.activeTabId);
  }

  selectTab(id: string) {
    this.activeTabId = id;
  }

  // TODO: generate and include transition animations 

}
