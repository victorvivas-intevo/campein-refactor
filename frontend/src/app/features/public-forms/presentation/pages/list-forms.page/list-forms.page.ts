import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-forms.page',
  imports: [],
  templateUrl: './list-forms.page.html',
})
export class ListFormsPage implements OnInit {

  codeTenant?: string;

  constructor(private readonly route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.codeTenant = this.route.snapshot.paramMap.get('codeTenant')!;
  }
}