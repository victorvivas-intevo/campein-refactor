import { Pipe, PipeTransform } from '@angular/core';
import { getRoleDisplayName } from '@/features/auth/domain/value-objects/role.dictionary';

@Pipe({
  name: 'roleName',
  standalone: true
})
export class RoleNamePipe implements PipeTransform {
  transform(roleCode: string | undefined | null): string {
    return getRoleDisplayName(roleCode);
  }
}