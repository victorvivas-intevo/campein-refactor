import { Injectable } from '@angular/core';
import { SessionStoreInterface } from '../../application/interfaces/session-store.interface';
import { Session } from '../../domain/entities/session.entity';
import { User } from '../../domain/entities/user.entity';
import { AuthTokens } from '../../domain/value-objects/auth-tokens.vo';
import { UserRole } from '@/features/users/domain/entities/objects';

type PersistedSession = {
  user: { id: string; email: string; name?: string; role: string; tenantId: string };
  tokens: { accessToken: string; refreshToken?: string };
  accessTokenExpiresAt?: string; // ISO
};

@Injectable()
export class LocalSessionStore implements SessionStoreInterface {
  private readonly key = 'auth.session';

  save(session: Session): void {
    const payload: PersistedSession = {
      user: {
        id: session.user.id,
        email: session.user.email,
        tenantId: session.user.tenantId,
        name: session.user.name,
        role: session.user.role ?? 'LIDER_BETA',
      },
      tokens: {
        accessToken: session.tokens.accessToken,
        refreshToken: session.tokens.refreshToken,
      },
      accessTokenExpiresAt: session.accessTokenExpiresAt?.toISOString(),
    };

    localStorage.setItem(this.key, JSON.stringify(payload));
    console.log("local-session.storage.ts save method called")
    console.log("Se creó la sesión en el almacenamiento local:", payload);
  }

  load(): Session | null {
    const raw = localStorage.getItem(this.key);
    console.log("local-session.storage.ts load method called");
    console.log(raw);
    if (!raw) return null;

    try {
      const data = JSON.parse(raw) as PersistedSession;
      const user = new User(data.user.id, data.user.tenantId, data.user.email, data.user.role ?? 'LIDER_BETA', data.user.name ?? '');
      const tokens = new AuthTokens(data.tokens.accessToken, data.tokens.refreshToken);
      const expiresAt = data.accessTokenExpiresAt ? new Date(data.accessTokenExpiresAt) : undefined;
      return new Session(user, tokens, expiresAt);
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }

  getRoleId(): UserRole {
    const session = this.load();
    return session?.user.role as UserRole ?? '';
  }

  getTenantId(): string {
    const session = this.load();
    return session?.user.tenantId ?? '';
  }

  getUserId(): string {
    const session = this.load();
    return session?.user.id ?? '';
  }
}
