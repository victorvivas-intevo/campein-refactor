import { Component } from '@angular/core';
import { Card } from "@/shared/ui/components/card/card";
import { DynamicForm } from '@/shared/ui/form-controls/dynamic-form/dynamic-form';
import { CommonModule } from '@angular/common';
import { FormSchema } from '@/shared/ui/form-controls/form-control.types';

import defaultFormSchema from '@/schemas/default-form.schema.json';
// import defaultFormSchema from '@/schemas/contact-form.schema.json';

@Component({
  selector: 'app-public-form.page',
  imports: [Card, CommonModule, DynamicForm],
  templateUrl: './public-form.page.html',
  styleUrl: './public-form.page.css',
})
export class PublicFormPage {
schema: FormSchema = defaultFormSchema as FormSchema;

  onSubmit(value: Record<string, any>) {
    // aquí llamas a tu caso de uso / servicio de dominio
    console.log('Formulario enviado', value);
  }

}
