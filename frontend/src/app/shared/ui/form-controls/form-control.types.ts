export type FieldType = 'text' | 'select' | 'autocomplete' | 'checkbox' | 'date' | 'tel';

export type ValidatorType =
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'pattern';

export interface FieldValidatorConfig {
  type: ValidatorType;
  value?: number | string;
  message?: string;
}

export interface FieldOption {
  label: string;
  value: string | number;
}

export type InputRestriction = 'digits' | 'textNoSpecials';

export interface FormFieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  column?: 1 | 2;
  order: number;
  options?: FieldOption[];
  validators?: FieldValidatorConfig[];
  inputType?: string;
  inputMode?: string;
  restriction?: InputRestriction;
}

export interface FormSchema {
  formId: string;
  title?: string;
  fields: FormFieldConfig[];
}
