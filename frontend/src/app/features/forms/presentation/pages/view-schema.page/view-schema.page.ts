import { FormFacade } from '@/features/forms/application/fecades/form.fecade';
import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '@/shared/ui/components/card/card';
import { ViewVersionList } from '../../components/view-version-list/view-version-list';
import { DatailsForm } from '../../components/datails-form/datails-form';
import { PreviewForm } from '../../components/preview-form/preview-form';
import { TabItem } from '@/shared/interfaces/tabs';
import { LogsSubmissions } from '../../components/logs-submissions/logs-submissions';
import { UsersAssignedForm } from '../../components/users-assigned-form/users-assigned-form';
import { StatsForm } from '../../components/stats-form/stats-form';
import { Tabs } from "@/shared/ui/components/tabs/tabs";

@Component({
  selector: 'app-view-schema.page',
  imports: [Card, ViewVersionList, DatailsForm, Tabs],
  templateUrl: './view-schema.page.html',
  styles: ``,
})
export class ViewSchemaPage implements OnInit {
  fecade = inject(FormFacade);

  // form?: GetFormDTO
  form$ = this.fecade.current;
  form?: GetFormDTO;
  versionForm?: GetFormVersionDTO;
  schema?: any;

  idForm?: string;
  idVersion?: string;

  formTabs: TabItem[] = [
    {
      id: 'preview',
      label: 'Previsualización',
      iconClass: 'fa-solid fa-newspaper',
      component: PreviewForm,
      inputs: { schema: null }, // Pasas datos al componente hijo
    },
    {
      id: 'log',
      label: 'Log de envíos',
      iconClass: 'fa-solid fa-database',
      component: LogsSubmissions,
      inputs: { formId: '123' }, // Pasas datos al componente hijo
    },
    {
      id: 'users',
      label: 'Usuarios',
      iconClass: 'fa-solid fa-users',
      component: UsersAssignedForm,
      inputs: { formId: '123' }, // Pasas datos al componente hijo
    },
    {
      id: 'stats',
      label: 'Estadísticas',
      iconClass: 'fa-solid fa-chart-column',
      component: StatsForm,
      inputs: { formId: '123' }, // Pasas datos al componente hijo
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  async ngOnInit() {
    this.idForm = this.route.snapshot.paramMap.get('codeForm')!;
    this.idVersion = this.route.snapshot.paramMap.get('codeVersion')!;

    this.fecade.loadOne({ id: this.idForm }).then((e) => {
      this.form = this.fecade.current() || undefined;
      this.versionForm = this.form?.versions?.find((v) => v.id === this.idVersion) || undefined;
      this.updateTabsData();
    });
    // await this.fecade.loadOne({id: this.idForm}).then(e =>{
    //   this.form = this.fecade.current() || undefined
    //   this.versionForm = this.form?.versions?.find(v => v.id === this.idVersion) || undefined
    //   console.log(this.form)
    // })
    // this.facade.load({ page: 1, pageSize: 10 }); // params
  }

  get getVersions(): GetFormVersionDTO[] {
    return this.form?.versions ?? [];
  }

  onVersionSelected(version: GetFormVersionDTO): void {
    this.idVersion = version.id;
    this.versionForm = this.form?.versions?.find((v) => v.id === this.idVersion);
    this.updateTabsData();
    this.router.navigate(['../', version.id], { 
      relativeTo: this.route, // Indica que partimos de la ruta actual
      replaceUrl: true        // Opcional: reemplaza el historial para que el botón "atrás" no sea infinito
    });
  }

  private updateTabsData() {
    this.formTabs = this.formTabs.map(tab => {
      if (tab.id === 'preview') {
        const schemaData = this.versionForm?.schema || this.versionForm; 
        return { ...tab, inputs: { schema: schemaData } };
      }
      if (tab.id === 'log') {
        return { ...tab, inputs: { submissions: this.form?.submissions, formId: this.idForm } };
      }
      // TODO: add rules to update inputs for other tabs
      // Actualizamos también el ID para los otros tabs si es necesario
      // if (['log', 'users', 'stats'].includes(tab.id)) {
      //   return { ...tab, inputs: { formId: this.idForm } };
      // }
      return tab;
    });
  }
}
