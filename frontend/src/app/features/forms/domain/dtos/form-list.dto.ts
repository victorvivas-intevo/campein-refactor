export interface RequestGetFormDTO {
  id?: string;
  code?: string;
}

export interface GetFormDTO {
  id: string;
  code: string;
  name: string;
  description?: string;
  versions: GetFormVersionDTO[];
  createdAt: Date;
}

export interface GetFormVersionDTO {
  id: string;
  version: number;
  isActive: boolean;
  schema?: JSON;
  submissions?: GetFormSubmissionDTO[];
  _count?: number;
}

export interface GetFormSubmissionDTO {
  id: String;
  formId?: String;
  formVersionId?: String;
  submittedAt: Date;
  submittedBy?: string; // id user
  payload: JSON;
  metadata?: JSON;
}
