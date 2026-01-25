export interface RequestGetFormDTO {
  id?: string;
  code?: string;
}

export interface GetFormDTO {
  id: string;
  code: string;
  name: string;
  description?: string;
  versions?: GetFormVersionDTO[];
  submissionCount?: number;
  createdAt?: Date;
  isActive: boolean;
  isPublic: boolean;
}

export interface GetFormVersionDTO {
  id: string;
  version: number;
  isActive: boolean;
  schema?: JSON;
  submissions?: GetFormSubmissionDTO[];
  _count?: {submissions: number};
  createdAt?: Date;
  submissionCount?: number;
  formId: string;
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
