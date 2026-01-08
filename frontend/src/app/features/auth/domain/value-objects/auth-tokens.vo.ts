export class AuthTokens {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken?: string,
  ) {
    if (!accessToken) throw new Error('accessToken is required');
  }
}
