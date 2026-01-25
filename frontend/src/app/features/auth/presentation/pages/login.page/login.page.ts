import { Component, inject } from '@angular/core';
import { LoginForm } from "../../components/login-form/login-form";
import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';
import { Router } from '@angular/router';
import { Card } from "@/shared/ui/components/card/card";

@Component({
  selector: 'app-login.page',
  imports: [LoginForm, Card],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
auth = inject(AuthFacade);
  router = inject(Router);

  error = '';

  onLogin(payload: { email: string; password: string }) {
    this.error = '';
    console.log('onLogin event login.page.ts');
    this.auth.login(payload).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigateByUrl('/app')
      },
      complete: () => {
        console.log('Login proceso completado');
      },
      error: (error) => {
        console.error(error)
        this.error = 'Credenciales inválidas o error de servidor'
      },
    });
  }
}
