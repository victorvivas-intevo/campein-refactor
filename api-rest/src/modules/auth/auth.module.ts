import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/use-case/jwt.service';
import { StringValue } from 'ms';
import { LOGIN_REPOSITORY } from './application/tokens';
import { LoginRepository } from './infrastructure/login.repository';
import { LoginController } from './presentation/login.controller';
import { LoginService } from './application/use-case/login.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config';
import { LogoutService } from './application/use-case/logout.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.getOrThrow<string>('JWT_SECRET');
        const expiresIn = (config.get<string>('JWT_EXPIRES_IN') ??
          '15m') as StringValue;

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  controllers: [LoginController],
  providers: [
    JwtStrategy,
    LoginRepository,
    LoginService,
    LogoutService,
    { provide: LOGIN_REPOSITORY, useExisting: LoginRepository },
  ],
  exports: [JwtStrategy, LoginService],
})
export class AuthModule {}
