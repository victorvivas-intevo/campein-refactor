import { Component } from '@angular/core';
import { Card } from "@/shared/ui/components/card/card";
import { StepByStep, StepItem } from '@/shared/ui/components/step-by-step/step-by-step';
import { Tabs } from "@/shared/ui/components/tabs/tabs";
import { TabItem } from '@/shared/interfaces/tabs';
import { StebAudienceUploadFile } from '../../components/steb-audience-upload-file/steb-audience-upload-file';
import { StebAudienceInternalUserList } from '../../components/steb-audience-internal-user-list/steb-audience-internal-user-list';

@Component({
  selector: 'app-notifications-principal-page',
  imports: [Card, StepByStep, Tabs],
  templateUrl: './principal.html',
  styles: ``,
})
export class Principal {
  pasoActual: number = 0;

  steps: StepItem[] = [
    { label: 'Audiencia' },
    { label: 'Mensaje' },
    { label: 'Publicar' },
    { label: 'Resumen' }
  ];

  formTabs: TabItem[] = [
      {
        id: 'upload',
        label: 'Carga masiva de numeros',
        iconClass: 'fa-solid fa-file-arrow-up',
        component: StebAudienceUploadFile,
        inputs: { schema: null }, // Pasas datos al componente hijo
      },
      {
        id: 'user-list',
        label: 'Lista interna de usuarios',
        iconClass: 'fa-solid fa-users',
        component: StebAudienceInternalUserList,
        inputs: { formId: null, schema: null }, // Pasas datos al componente hijo
      },
    ];


  changeSteb(stepIndex: number) {
    console.log('Paso seleccionado:', stepIndex);
    this.pasoActual = stepIndex;
  }

}
