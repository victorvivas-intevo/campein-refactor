import { InjectionToken } from '@angular/core';
import { Session } from '../../domain/entities/session.entity';

export const SESSION_STORE_TOKEN = new InjectionToken<SessionStoreInterface>(
  "SESSION_STORE_TOKEN"
);

export interface SessionStoreInterface {
  save(session: Session): void;
  load(): Session | null;
  clear(): void;

  getTenantId(): string;
  getUserId(): string;
  getRoleId(): string;
}
