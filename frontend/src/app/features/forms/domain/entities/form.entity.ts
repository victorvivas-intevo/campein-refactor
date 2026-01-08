export class Form {
  constructor(
    public readonly id: string,
    public readonly tenantId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description?: string,
    public readonly createdAt?: Date,
    // relaciones
    // versions    FormVersion[]
    // submissions FormSubmission[]
  ) {
    if (!id) throw new Error('Form.id is required');
    if (!tenantId) throw new Error('Form.tenantId is required');
    if (!code) throw new Error('Form.code is required');
    if (!name) throw new Error('Form.name is required');
  }
}
