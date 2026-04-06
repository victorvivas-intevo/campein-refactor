import { PublicFormsFacade } from '@/features/public-forms/application/facades/PublicForm.fecade';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from "@/shared/ui/components/card/card";

@Component({
  selector: 'app-list-forms.page',
  imports: [Card],
  templateUrl: './list-forms.page.html',
})
export class ListFormsPage implements OnInit {

  codeTenant?: string;

  facade = inject(PublicFormsFacade);

  constructor(private readonly route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('codeTenant');
    if (code !== null) {
      this.codeTenant = code;
    } else {
      // TODO: agregar redirección a página de error o mostrar mensaje de error
      console.error('No se proporcionó un código de tenant válido en la URL.');
      return
    }

    this.facade.loadFormsByTenant(this.codeTenant);
  }
}