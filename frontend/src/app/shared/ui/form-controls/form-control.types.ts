export type FieldType = 'text' | 'select' | 'autocomplete' | 'checkbox' | 'date' | 'tel';

export type ValidatorType = 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';

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

export type FieldLabelActionType = 'openModal' | 'navigate' | 'externalLink';

export interface FieldLabelActionConfig {
  labelId?: string;
  type: FieldLabelActionType;
  modalId?: string;
  route?: string;
  url?: string;
  text: string;
}

export interface FieldLabelConfig {
  text: string;
  actions?: FieldLabelActionConfig[];
}

export interface FieldDataSource {
  action: 'getDepartments' | 'getMunicipalities'; // Fuerte tipado en vez de un string suelto
  valueKey: string; // ej: 'code' (lo que se guarda en el form)
  labelKey: string; // ej: 'name' (lo que ve el usuario)
}

export interface FormFieldConfig {
  id: string;
  type: FieldType;
  label: string | FieldLabelConfig;
  placeholder?: string;
  required?: boolean;
  column?: 1 | 2;
  order: number;
  options?: FieldOption[];

  dataSource?: FieldDataSource;
  dependsOn?: string; // El ID del campo padre (ej: 'departamentoId')
  dependencyParam?: string; // El query param a enviar al backend (ej: 'departmentCode')

  validators?: FieldValidatorConfig[];
  inputType?: string;
  inputMode?: string;
  restriction?: InputRestriction;
}

export interface FormSchema {
  formId: string;
  title?: string;
  description?: string;
  fields: FormFieldConfig[];
}
