import {
  // BadRequestException,
  Inject,
  Injectable,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import type { LoginRepositoryInterface } from '../../infrastructure/interfaces/login-interface.repository';
import { LOGIN_REPOSITORY } from '../tokens';
import { LoginDto, LoginResponseDto } from '../dtos/login.dto';
import {
  generateRefreshToken,
  hashToken,
} from 'src/common/utils/generate-token';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly service: LoginRepositoryInterface,
    private readonly jwt: JwtService,
  ) {}

  private async signAccessToken(user: {
    id: string;
    tenantId: string;
    email: string;
    role: string;
    sessionId: string;
    exp?: Date | number;
    fullName?: string;
  }): Promise<string> {
    return this.jwt.signAsync({
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
      sessionId: user.sessionId,
      fullName: user.fullName || undefined,
    });
  }

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    if (!dto.email || !dto.password) {
      throw new UnauthorizedException('Email y contraseña son requeridos.');
    }

    const user = await this.service.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Usuario no encontrado.');

    const passwordMatch = await bcrypt.compare(dto.password, user.password!);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo.');
    }

    const refresh = generateRefreshToken();
    const refreshHash = hashToken(refresh);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 días

    const sessionId = await this.service.saveAccessToken(
      user,
      refreshHash,
      expiresAt,
    );
    console.log(
      'Before await this.service.saveAccessToken(user, refreshHash, expiresAt);',
    );

    const accessToken = await this.signAccessToken({
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
      fullName: user.fullName ? user.fullName : undefined,
      sessionId: sessionId.id,
    });

    console.log('accessToken ', accessToken);
    return {
      accessToken,
      refresh_token: refresh,
      refresh_expires_at: expiresAt,
    };
  }
}
