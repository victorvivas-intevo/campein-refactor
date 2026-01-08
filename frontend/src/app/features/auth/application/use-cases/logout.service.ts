import { SessionStoreInterface } from '../interfaces/session-store.interface';

export class LogoutUseCase {
  constructor(private readonly store: SessionStoreInterface) {}

  execute(): void {
    this.store.clear();
  }
}
