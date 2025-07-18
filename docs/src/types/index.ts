export interface CustomFormRequest {
  title: string;
  description: string;
  fields: InputField[];
}

export interface InputField {
  id: number;
  index: number;
  type: string;
  config: InputFieldConfig;
}

export interface InputFieldConfig {
  label: string;
  required: boolean;
  span: number;
  default_value: string;
  options?: Option[];
  label_size?: number;
}

export interface Option {
  id: number;
  index: number;
  label: string;
  value: string;
}

export interface InputFieldRequest {
  id: number;
  index: number;
  type: string;
  config: InputFieldConfigRequest;
}

export interface InputFieldConfigRequest {
  label: string;
  required: boolean;
  span: number;
  default_value: string;
  options?: OptionRequest[];
  label_size?: number;
}

export interface OptionRequest {
  id: number;
  index: number;
  label: string;
  value: string;
}

export enum FormTypeEnum {
  TEXT = "text",
  SELECT = "select",
  MULTISELECT = "multiselect",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  DATE = "date",
  DATETIME = "datetime",
  HEADING = "heading",
}

export enum TypeD59Enum {
  TEXT = "text",
  SELECT = "select",
  MULTISELECT = "multiselect",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  DATE = "date",
  DATETIME = "datetime",
  HEADING = "heading",
}