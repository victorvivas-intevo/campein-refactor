import { Component, input, output } from '@angular/core';
import { Button } from "@/shared/ui/components/button/button";
import { User } from '@/features/auth/domain/entities/user.entity';
import { UserResponseDto } from '@/features/users/domain/dtos/user.dto';

@Component({
  selector: 'app-user-assignment',
  imports: [Button],
  templateUrl: './user-assignment.html',
  styles: ``,
})
export class UserAssignment {

  userSession = input.required<User>();
  user = input.required<UserResponseDto>();
  submit = output<any>();
  skip = output();
  isLoading = input<boolean>(false);

  ngOnInit(): void {
    console.log("currentUser, ", this.userSession())
    console.log("userData, ", this.user())
  }

  skipStep(): void {
    this.skip.emit();
  }


}
