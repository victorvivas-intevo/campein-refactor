import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { LoginDto, LoginResponseDto, RefreshTokenDto } from '../application/dtos/login.dto';
import { LoginService } from '../application/use-case/login.service';
import { LogoutService } from '../application/use-case/logout.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    
    const result: LoginResponseDto = await this.loginService.execute(dto).then(res => res);
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: false, // cambiar a true en producción (certificado SSL)
      sameSite: 'none', // para cross-site (Angular en otro dominio)
      path: '/auth/refresh',
      expires: result.refresh_expires_at,
    });
    return result;
  }

  @Post('logout')
  logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const sessionId = req.user?.sessionId;
    if(sessionId) this.logoutService.execute(sessionId);
    res.clearCookie('refresh_token', { path: '/auth/refresh' });
  }

  @Post('revoke-tokens')
  revokeTokens() {
    return { message: 'revoke tokens in development' };
  }

  @Post('refresh-token')
  refreshToken() {
    return { message: 'refresh tokens in development' };
  }
}
