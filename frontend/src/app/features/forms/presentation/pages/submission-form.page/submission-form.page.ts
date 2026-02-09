import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';
import { FormFacade } from '@/features/forms/application/fecades/form.fecade';
import { GetFormVersionDTO, UserDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { PublicFormApiService } from '@/features/public-form/data-access/public-form.service';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from '@/shared/ui/form-controls/dynamic-form/dynamic-form';
import { Button } from '@/shared/ui/components/button/button';
import { CommonModule, Location } from '@angular/common';
import { FormSchema } from '@/features/public-form/domain/types/public-form.types';
import {
  FieldLabelActionConfig,
  FormFieldConfig,
} from '@/shared/ui/form-controls/form-control.types';
// import { FormSchema } from '@/features/public-form/domain/types/public-form.types';
@Component({
  selector: 'app-submission-form.page',
  imports: [Button, DynamicForm, CommonModule],
  templateUrl: './submission-form.page.html',
  styles: ``,
})
export class SubmissionFormPage implements OnInit {
  @ViewChild(DynamicForm)
  dynamicForm!: DynamicForm;

  @ViewChild('pageTop')
  pageTop!: ElementRef<HTMLDivElement>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formFacade = inject(FormFacade);
  private location = inject(Location);
  public authFacade = inject(AuthFacade);

  private publicFormService = inject(PublicFormApiService);

  codeForm: string | null = null;
  loading = signal<boolean>(true);
  submitting = signal<boolean>(false);
  success = signal<boolean>(false);
  error = signal<string | null>(null);
  formSchema = signal<FormSchema | null>(null);

  currentForm = this.formFacade.current;
  currentUser = this.authFacade.session;

  // versionActive? = computed(() => this.currentForm()?.versions?.map((e) => {return e.isActive}) || null);

  get versionActive() {
    const data = this.currentForm()?.versions?.find((v) => v.isActive) || null;
    if (data === null) return null;
    const check: FormFieldConfig = {
      id: 'dataPolicyConsent',
      type: 'checkbox',
      label: {
        text: 'Autorizo el tratamiento de mis datos personales de acuerdo con la',
        actions: [
          {
            type: 'openModal',
            modalId: 'data-policy',
            text: 'Política de tratamiento de datos',
          },
        ],
      },
      required: true,
      column: 1,
      order: 999,
    };
    const schema: FormSchema = data.schema
      ? {
          fields: [...data.schema.fields, check],
          formId: data.formId,
          title: this.currentForm()?.name || 'Formulario sin título',
        }
      : {
          fields: [],
          formId: data.formId,
          title: this.currentForm()?.name || 'Formulario sin título',
        };
    return schema;
  }

  canAccess = computed(() => {
    const user = this.currentUser()?.user;
    const form = this.currentForm();

    // 1. Si no hay datos, no hay acceso aún
    if (!user || !form) return false;

    // 2. Si es ADMIN, pase directo
    if (user.role === 'ADMIN_CAMPANA' || user.role === 'ADMIN_SISTEMA') return true;

    // 3. Validación de privilegios (Asumiendo que el form tiene una lista de usuarios asignados)
    // Ajusta 'assignedUsers' según como se llame la propiedad en tu DTO de formulario
    const isAssigned = form.assignments?.some((u: UserDTO) => u.id === user.id);

    // O si la validación es por "Activo"
    const isActive = form.isActive;

    return isAssigned && isActive;
  });

  ngOnInit(): void {
    this.codeForm = this.route.snapshot.paramMap.get('codeForm');

    if (this.codeForm) {
      // Cargamos el formulario usando el ID/Código de la URL
      this.formFacade.loadOne({ code: this.codeForm }).then((e) => {
        this.formSchema.set(this.versionActive);
      });
      // Nota: Asegúrate que getFormById actualice el signal 'currentSchema' o el que uses.
      this.loading.set(false);
    } else {
      this.error.set('Código de formulario no válido');
      this.loading.set(false);
    }
  }

  constructor() {
    // Efecto opcional: Redirigir si termina de cargar y no tiene acceso
    effect(() => {
      if (!this.loading() && this.currentForm() && !this.canAccess()) {
        // console.warn('Usuario sin privilegios para este formulario');
        this.router.navigate(['/dashboard']); // Descomentar para redirigir automáticamente
      }
    });
  }

  async onSubmit(payload: Record<string, any>): Promise<void> {
    if (!this.codeForm || !this.canAccess()) {
      console.error('No se puede enviar el formulario: código inválido o sin acceso');
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    try {
      // Aquí llamamos al servicio para guardar.
      // Reutilizando la lógica de public-form o una nueva en formFacade
      await this.publicFormService
        .submitForm(this.codeForm, payload, { submittedBy: this.currentUser()?.user.id })
        .subscribe({
          next: (response) => {
            console.log('Formulario enviado con éxito', response);
            this.success.set(true);
            this.scrollToTop();
            this.dynamicForm?.resetForm();
          },
          error: (err) => {
            console.error('Error enviando formulario', err);
            this.error.set('Ocurrió un error al enviar el formulario. Intenta nuevamente.');
            this.submitting.set(false);
          },
        });

      this.success.set(true);
      this.submitting.set(false);

      // Opcional: Redirigir después de unos segundos
      // setTimeout(() => {
      //   // this.router.navigate(['/forms']);
      //   this.location.back();
      // }, 3000);
    } catch (err) {
      console.error(err);
      this.error.set('Ocurrió un error al enviar el formulario. Intenta nuevamente.');
      this.submitting.set(false);
    }
  }

  goBack(action: string): void {
    switch (action) {
      case 'back':
        this.location.back();
        break;
      case 'new':
        this.success.set(false);
        this.dynamicForm?.resetForm();
        this.scrollToTop();
        return;
    }
  }

  onFieldLabelAction(action: FieldLabelActionConfig): void {
    if (action.type === 'openModal' && action.modalId === 'data-policy') {
      // this.dataPolicyModalOpen.set(true);
    }
  }

  private scrollToTop(): void {
    if (this.pageTop?.nativeElement) {
      this.pageTop.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
