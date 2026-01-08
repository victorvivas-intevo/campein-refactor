export interface CreateFormDTO {
    tenantId: string;
    code: string;
    name: string;
    description?: string;
}

export interface ResponseCreateFormDTO {
    id: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string;
    createdAt: Date;
}