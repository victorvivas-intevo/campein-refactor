import { InjectionToken } from '@angular/core';
import { Session } from '../../domain/entities/session.entity';
import { UserRole } from '@/features/users/domain/entities/objects';

export const SESSION_STORE_TOKEN = new InjectionToken<SessionStoreInterface>(
  "SESSION_STORE_TOKEN"
);

export interface SessionStoreInterface {
  save(session: Session): void;
  load(): Session | null;
  clear(): void;

  getTenantId(): string;
  getUserId(): string;
  getRoleId(): UserRole;
}
