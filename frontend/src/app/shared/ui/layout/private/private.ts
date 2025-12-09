import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './private.html',
  styleUrl: './private.css',
})
export class Private {

}
