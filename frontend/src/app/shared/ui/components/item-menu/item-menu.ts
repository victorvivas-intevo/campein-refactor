import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MenuInterface } from '@/shared/interfaces/menu';

@Component({
  selector: 'app-item-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './item-menu.html',
  styles: ``,
})
export class ItemMenu {
  @Input() item!: MenuInterface;

}
