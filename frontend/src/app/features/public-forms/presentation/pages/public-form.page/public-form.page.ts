import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-form.page',
  imports: [],
  templateUrl: './public-form.page.html',
})
export class PublicFormPage implements OnInit {

  // TODO: inyect Fecade
  
  codeTenant?: string;
  codeForm?: string;

  constructor(private readonly route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.codeTenant = this.route.snapshot.paramMap.get('codeTenant')!;
    this.codeForm = this.route.snapshot.paramMap.get('codeForm')!;
  }
}
