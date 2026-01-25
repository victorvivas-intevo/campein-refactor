export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface LoginResponseDto {
  accessToken: string;
  refresh_token: string;
  refresh_expires_at: Date;
}

export interface LogoutMessage {
  message: string;
}
