import { Session } from '../entities/session.entity';

export class CanAccessPolicy {
  static byRole(session: Session | null, requiredRole: string): boolean {
    if (!requiredRole) return true;
    if (!session) return false;

    return session.user.role === requiredRole;
  }
}
