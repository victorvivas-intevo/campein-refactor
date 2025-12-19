import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { LoginRepositoryInterface } from '../../infrastructure/interfaces/login-interface.repository';
import { LOGIN_REPOSITORY } from '../tokens';
import { LoginDto } from '../dtos/login.dto';
import { hashToken } from 'src/common/utils/generate-token';

@Injectable()
export class LogoutService {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly service: LoginRepositoryInterface,
  ) {}

  async execute(sessionId: string): Promise<any> {
    const user = await this.service.logout(sessionId);
    return user;
  }
}
