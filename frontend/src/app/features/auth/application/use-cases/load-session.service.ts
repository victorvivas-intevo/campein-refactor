import { SessionStoreInterface } from '../interfaces/session-store.interface';
import { Session } from '../../domain/entities/session.entity';

export class LoadSessionUseCase {
  constructor(private readonly store: SessionStoreInterface) {}

  execute(): Session | null {
    return this.store.load();
  }
}
