import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { LoginRepositoryInterface } from '../../infrastructure/interfaces/login-interface.repository';
import { LOGIN_REPOSITORY } from '../tokens';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    @Inject(LOGIN_REPOSITORY)
    private readonly service: LoginRepositoryInterface,
  ) {
    const secret = config.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET is not set');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const sessionId = payload.sessionId as string | undefined;
    const userId = payload.sub as string | undefined;

    if (!sessionId || !userId)
      throw new UnauthorizedException('Token inválido.');

    const session = await this.service.getSessionById(sessionId);

    if (!session) throw new UnauthorizedException('Sesión inválida.');
    if (session.revokedAt) throw new UnauthorizedException('Sesión revocada.');
    if (session.expiresAt <= new Date())
      throw new UnauthorizedException('Sesión expirada.');
    if (session.userId !== userId)
      throw new UnauthorizedException('Sesión no coincide.');

    return payload;
  }
}
