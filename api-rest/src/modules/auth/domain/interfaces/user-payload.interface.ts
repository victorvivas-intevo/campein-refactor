export interface UserPayload {
  id: string;
  email: string;
  role: string;
  tenantId: string;
  leaderId?: string;
}
