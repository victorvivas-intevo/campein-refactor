import { getRoleDisplayName } from '@/features/auth/domain/value-objects/role.dictionary';
import { UserResponseDto } from '@/features/users/domain/dtos/user.dto';
import { RoleNamePipe } from '@/shared/ui/pipes/role-name.pipe';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  imports: [RoleNamePipe],
  templateUrl: './user-info.html',
  styles: ``,
})
export class UserInfo {
  user = input.required<UserResponseDto>();

}
