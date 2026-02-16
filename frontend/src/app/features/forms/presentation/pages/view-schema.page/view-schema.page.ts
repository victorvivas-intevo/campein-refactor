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
import { Tabs } from '@/shared/ui/components/tabs/tabs';
import { SESSION_STORE_TOKEN } from '@/features/auth/application/interfaces/session-store.interface';
import { UserRole } from '@/features/users/domain/entities/objects';
import { Skeleton } from '@/shared/ui/components/skeleton/skeleton';

@Component({
  selector: 'app-view-schema.page',
  imports: [Card, ViewVersionList, DatailsForm, Tabs, Skeleton],
  templateUrl: './view-schema.page.html',
  styles: ``,
})
export class ViewSchemaPage implements OnInit {
  fecade = inject(FormFacade);
  session = inject(SESSION_STORE_TOKEN);

  // form?: GetFormDTO
  form$ = this.fecade.current;
  form?: GetFormDTO;
  loadForm: boolean = true;
  versionForm?: GetFormVersionDTO;
  schema?: any;

  idForm?: string;
  idVersion?: string;

  formTabs: TabItem[] = [];

  role?: UserRole;

  private readonly allTabs: TabItem[] = [
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
      inputs: { formId: null, schema: null }, // Pasas datos al componente hijo
    },
    {
      id: 'users',
      label: 'Usuarios',
      iconClass: 'fa-solid fa-users',
      component: UsersAssignedForm,
    },
    {
      id: 'stats',
      label: 'Estadísticas',
      iconClass: 'fa-solid fa-chart-column',
      component: StatsForm,
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  async ngOnInit() {
    this.idForm = this.route.snapshot.paramMap.get('codeForm')!;
    this.idVersion = this.route.snapshot.paramMap.get('codeVersion')!;

    this.role = this.session.getRoleId();
    this.buildTaps(this.role);

    this.loadForm = true;
    this.fecade.loadOne({ id: this.idForm }).then((e) => {
      this.form = this.fecade.current() || undefined;
      this.versionForm = this.form?.versions?.find((v) => v.id === this.idVersion) || undefined;
      this.updateTabsData();
    });
    this.loadForm = false;
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
      replaceUrl: true, // Opcional: reemplaza el historial para que el botón "atrás" no sea infinito
    });
  }

  private updateTabsData() {
    this.formTabs = this.formTabs.map((tab) => {
      const schemaData = this.versionForm?.schema || this.versionForm;
      if (tab.id === 'preview') {
        return { ...tab, inputs: { schema: schemaData } };
      }
      if (tab.id === 'log') {
        return {
          ...tab,
          inputs: { submissions: this.form?.submissions, formId: this.idForm, schema: schemaData },
        };
      }
      // TODO: add rules to update inputs for other tabs
      // Actualizamos también el ID para los otros tabs si es necesario
      // if (['log', 'users', 'stats'].includes(tab.id)) {
      //   return { ...tab, inputs: { formId: this.idForm } };
      // }
      return tab;
    });
  }

  private readonly tabsByRole: Record<UserRole, string[]> = {
    [UserRole.ADMIN_SISTEMA]: ['preview', 'log', 'users', 'stats'],
    [UserRole.ADMIN_CAMPANA]: ['preview', 'log', 'users', 'stats'],
    [UserRole.LIDER_ALFA]: ['preview', 'log', 'stats'],
    [UserRole.LIDER_BETA]: ['log', 'stats'],
  };

  private buildTaps(role: UserRole) {
    const allowedTabs = this.tabsByRole[role] || [];
    this.formTabs = this.allTabs.filter((tab) => allowedTabs.includes(tab.id));
  }

  canViewForm(): boolean {
    if (this.role === UserRole.LIDER_BETA || this.role === UserRole.LIDER_ALFA) return false;
    return true;
  }
}
