export class User {
  constructor(
    public readonly id: string,
    public readonly tenantId: string,
    public readonly email: string,
    public readonly rol: string,
    public readonly name?: string,
  ) {
    if (!id) throw new Error('User.id is required');
    if (!tenantId) throw new Error('User.tenantId is required');
    if (!email) throw new Error('User.email is required');
    if (!rol) throw new Error('User.rol is required');
  }
}
