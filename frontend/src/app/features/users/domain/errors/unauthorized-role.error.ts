export class UnauthorizedRoleError extends Error {
  constructor(message: string = 'No tienes los permisos suficientes para realizar esta acción.') {
    super(message);
    this.name = 'UnauthorizedRoleError';
  }
}