import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from '../../components/top-bar/top-bar';
import { SideBar } from '../../components/side-bar/side-bar';

@Component({
  selector: 'app-private',
  imports: [CommonModule, RouterOutlet, TopBar, SideBar],
  templateUrl: './private.html',
  styleUrl: './private.css',
})
export class Private {

}
