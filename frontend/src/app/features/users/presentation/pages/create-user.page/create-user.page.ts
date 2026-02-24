import { Component, inject, signal } from '@angular/core';
import { Card } from "@/shared/ui/components/card/card";
import { StepByStep, StepItem } from "@/shared/ui/components/step-by-step/step-by-step";
import { AuthFacade } from '@/features/auth/application/fecades/auth.fecade';
import { Button } from "@/shared/ui/components/button/button";
import { CreateForm } from "../../components/create-form/create-form";
import { FormAssignment } from "../../components/form-assignment/form-assignment";
import { UserAssignment } from "../../components/user-assignment/user-assignment";

@Component({
  selector: 'app-create-user.page',
  imports: [Card, StepByStep, Button, CreateForm, FormAssignment, UserAssignment],
  templateUrl: './create-user.page.html',
})
export class CreateUserPage {

  authFecade = inject(AuthFacade);

  steps = signal<StepItem[]>([
    { label: 'Creación' },
    { label: 'Asignación de formularios', description: 'Opcional' },
    { label: 'Jerarquía', description: 'Opcional' },
  ]);

  currentStep = signal<number>(0);

  nextStep() {
    // Verificamos si el navegador soporta la API (Estándar en 2026)
    if (!document.startViewTransition) {
      this.updateStep();
      return;
    }

    // El navegador "graba" el estado actual, espera a que cambie la señal y anima
    document.startViewTransition(() => {
      this.updateStep();
    });
  }

  private updateStep() {
    this.currentStep.update(val => {
      if (val < this.steps().length - 1) return val + 1;
      return val;
    });
  }

  

}
