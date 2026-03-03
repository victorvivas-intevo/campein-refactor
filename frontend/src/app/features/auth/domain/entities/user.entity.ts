export class User {
  constructor(
    public readonly id: string,
    public readonly tenantId: string,
    public readonly email: string,
    public readonly role: string,
    public readonly name?: string,
  ) {
    if (!id) throw new Error('User.id is required');
    if (!tenantId) throw new Error('User.tenantId is required');
    if (!email) throw new Error('User.email is required');
    if (!role) throw new Error('User.role is required');
  }


  get initials(): string {
    return this.name?.split(' ').map(n => n[0]).join('').substring(0, 2) ?? 'NN';
  }

  get isAdmin(): boolean {
    return ['ADMIN_SISTEMA', 'ADMIN_CAMPANA'].includes(this.role);
  }
  
  get isAlfa(): boolean {
    return ['LIDER_ALFA',].includes(this.role);
  }

  get isBeta(): boolean {
    return ['LIDER_BETA',].includes(this.role);
  }
}
