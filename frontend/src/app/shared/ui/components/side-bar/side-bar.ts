import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, Menu],
  templateUrl: './side-bar.html',
  styles: ``,
})
export class SideBar {

}
