import { Component, input } from '@angular/core';
import { Button } from "@/shared/ui/components/button/button";
import { User } from '@/features/auth/domain/entities/user.entity';

@Component({
  selector: 'app-create-form',
  imports: [Button],
  templateUrl: './create-form.html',
  styles: ``,
})
export class CreateForm {
  user = input.required<User>();

}
