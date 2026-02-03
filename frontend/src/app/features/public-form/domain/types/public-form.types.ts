import { FormFieldConfig } from "@/shared/ui/form-controls/form-control.types";

export interface FormSchema {
  formId: string;
  title: string;
  fields: FormFieldConfig[];
}

export interface PublicFormSchemaResponse {
  formId: string;   // id interno del formulario en la BD
  code: string;     // ej: "public-contact-form"
  name: string;     // nombre legible
  version: number;  // versión activa
  schema: FormSchema;
  isPublic: boolean;
  isActive: boolean;
}

export interface PublicFormSubmissionResponse {
  id: string;
  formId: string;
  formVersionId: string;
  submittedAt: string; // ISO string
}