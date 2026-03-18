import { Component, input, output } from '@angular/core';
import { Button } from "@/shared/ui/components/button/button";
import { User } from '@/features/auth/domain/entities/user.entity';
import { UserResponseDto } from '@/features/users/domain/dtos/user.dto';
import { Table } from "@/shared/ui/components/table/table";
import { UICase } from '@/features/users/domain/types/user.types';

@Component({
  selector: 'app-user-assignment',
  imports: [Button, Table],
  templateUrl: './user-assignment.html',
  styles: ``,
})
export class UserAssignment {

  roleCase = input.required<UICase>();
  users = input.required<UserResponseDto[]>();
  submit = output<any>();
  skip = output();
  isLoading = input<boolean>(false);

  skipStep(): void {
    this.skip.emit();
  }


}
