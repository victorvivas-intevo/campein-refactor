import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';
import { FormFacade } from '@/features/forms/application/fecades/form.fecade';
import { GetFormVersionDTO, UserDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { PublicFormApiService } from '@/features/public-form/data-access/public-form.service';
import { Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm } from "@/shared/ui/form-controls/dynamic-form/dynamic-form";
import { Button } from "@/shared/ui/components/button/button";
// import { FormSchema } from '@/features/public-form/domain/types/public-form.types';
@Component({
  selector: 'app-submission-form.page',
  imports: [DynamicForm, Button],
  templateUrl: './submission-form.page.html',
  styles: ``,
})
export class SubmissionFormPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formFacade = inject(FormFacade);
  public authFacade = inject(AuthFacade);

  private publicFormService = inject(PublicFormApiService);

  codeForm: string | null = null;
  loading = signal<boolean>(true);
  submitting = signal<boolean>(false);
  success = signal<boolean>(false);
  error = signal<string | null>(null);

  currentForm = this.formFacade.current; 
  currentUser = this.authFacade.session;



  // versionActive? = computed(() => this.currentForm()?.versions?.map((e) => {return e.isActive}) || null);

  get versionActive() {
    return true
    // const data: GetFormVersionDTO | null = this.currentForm()?.versions?.find(v => v.isActive) || null;
    // if(data === null) return null;
    // const schema: FormSchema = {
    //   fields: data.schema?['fields'],
    //   formId: data.formId,
    //   title: data || 'Formulario sin título'
    // } 
    // return schema;
  }

  canAccess = computed(() => {
    const user = this.currentUser()?.user;
    const form = this.currentForm();

    // 1. Si no hay datos, no hay acceso aún
    if (!user || !form) return false;

    // 2. Si es ADMIN, pase directo
    if (user.role === 'ADMIN') return true;

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
      this.formFacade.GetFormByCode(this.codeForm); 
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
        console.warn('Usuario sin privilegios para este formulario');
        // this.router.navigate(['/dashboard']); // Descomentar para redirigir automáticamente
      }
    });
  }

  async onSubmit(formData: any) {
    if (!this.codeForm || !this.canAccess()) return;

    this.submitting.set(true);
    this.error.set(null);

    try {
      // Aquí llamamos al servicio para guardar. 
      // Reutilizando la lógica de public-form o una nueva en formFacade
      await this.publicFormService.submitForm(this.codeForm, formData).toPromise();
      
      this.success.set(true);
      this.submitting.set(false);
      
      // Opcional: Redirigir después de unos segundos
      setTimeout(() => {
        this.router.navigate(['/forms']);
      }, 3000);

    } catch (err) {
      console.error(err);
      this.error.set('Ocurrió un error al enviar el formulario. Intenta nuevamente.');
      this.submitting.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/forms']);
  }

  
}
