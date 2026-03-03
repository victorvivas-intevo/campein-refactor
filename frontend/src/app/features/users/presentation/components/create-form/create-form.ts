import { Component, effect, input, OnInit, output } from '@angular/core';
import { Button } from "@/shared/ui/components/button/button";
import { User } from '@/features/auth/domain/entities/user.entity';
import { CreateUserDto, UserRole } from '@/features/users/domain/dtos/user.dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './create-form.html',
  styles: ``,
})
export class CreateForm implements OnInit {
  user = input.required<User>();

  submitForm = output<CreateUserDto>();

  isLoading = input<boolean>(false);

  form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    role: new FormControl<UserRole | null>(null, [Validators.required]),
    tenantId: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    isActive: new FormControl(true, { nonNullable: true }) // true por defecto (Activo)
  });

  constructor() {
    effect(() => {
      if (this.isLoading()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  ngOnInit(): void {
    const currentUser = this.user();

    if (currentUser.role === 'LIDER_ALFA') {
      this.form.patchValue({
        role: 'LIDER_BETA',
        tenantId: currentUser.tenantId
      });
    } else if (currentUser.role === 'ADMIN_CAMPANA') {
      this.form.patchValue({
        tenantId: currentUser.tenantId
      });
    }
  }

  createUser(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue();

    let role = formValues.role as UserRole;
    let tenantId: string;
    let leaderId: string | null = null;

    if(this.user().role === 'LIDER_ALFA') {
      role = 'LIDER_BETA';
      leaderId = this.user().id;
    }
    if(this.user().role === 'LIDER_ALFA' || this.user().role === 'ADMIN_CAMPANA') {
      tenantId = this.user().tenantId;
    } else {
      tenantId = formValues.tenantId;
    }

    const formData: CreateUserDto = {
      fullName: formValues.fullName,
      email: formValues.email,
      role: role,
      tenantId: tenantId,
      password: 'defaultPassword123',
      isActive: formValues.isActive
    };

    if(this.user().role === 'LIDER_ALFA') {
      formData.leaderId = this.user().id;
    }
    
    this.submitForm.emit(formData);
  }


  resetForm() {
    this.form.reset({
      isActive: true // Para que el switch vuelva a estar en 'Activo'
    });
    this.ngOnInit();
  }

}
