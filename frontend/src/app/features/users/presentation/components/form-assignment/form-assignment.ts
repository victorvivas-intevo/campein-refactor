import { Component, input, output } from '@angular/core';
import { Button } from "@/shared/ui/components/button/button";
import { User } from '@/features/auth/domain/entities/user.entity';
import { UserResponseDto } from '@/features/users/domain/dtos/user.dto';

@Component({
  selector: 'app-form-assignment',
  imports: [Button],
  templateUrl: './form-assignment.html',
  styles: ``,
})
export class FormAssignment {

  userSession = input.required<User>();
  user = input.required<UserResponseDto>();
  submit = output<any>();

  isLoading = input<boolean>(false);

}
