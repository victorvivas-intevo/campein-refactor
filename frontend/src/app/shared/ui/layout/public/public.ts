import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './public.html',
  styleUrl: './public.css',
})
export class Public {

}
