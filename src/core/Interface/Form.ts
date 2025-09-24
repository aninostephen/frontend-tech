import type { Control, FieldError } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  required?: boolean | ((form: any) => boolean);
  disabled?: boolean;
  readOnly?: boolean;
  description?: string;
  rows?: number;
  control: Control<any>;
  validation?: ValidationRule;
  error?: FieldError;
}

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validate?: (value: any) => boolean | string;
}

interface SelectOption {
  label: string;
  value: any;
}

interface SelectProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean | ((form: any) => boolean);
  disabled?: boolean;
  description?: string;
  control: Control<any>;
  validation?: ValidationRule;
  error?: FieldError;
  options?: SelectOption[];
  mode?: 'multiple' | 'tags';
  allowClear?: boolean;
  showSearch?: boolean;
  loading?: boolean;
}

interface DatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean | ((form: any) => boolean);
  disabled?: boolean;
  description?: string;
  control: Control<any>;
  validation?: ValidationRule;
  error?: FieldError;
  format?: string;
  showTime?: boolean;
  allowClear?: boolean;
  size?: 'small' | 'middle' | 'large';
}

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean | ((form: any) => boolean);
    disabled?: boolean;
    readOnly?: boolean;
    description?: string;
    onChange?: (value: any, form: any) => void;
    visibleWhen?: (values: any) => boolean;
    validation?: ValidationRule;
    options?: SelectOption[]; // For select fields
    mode?: 'multiple' | 'tags'; // For select fields
    allowClear?: boolean; // For select fields
    showSearch?: boolean; // For select fields
    loading?: boolean; // For select fields
    format?: string; // For datepicker fields
    showTime?: boolean; // For datepicker fields
    size?: 'small' | 'middle' | 'large'; // For datepicker fields
}
  
interface FormTab {
    label: string;
    key: string;
    fields: FormField[];
}
  
interface MainFormProps {
    fields?: FormField[];
    tabs?: FormTab[];
    onSubmit: (values: any) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    defaultValues?: Record<string, any>;
    title?: string;
    description?: string;
    mode?: 'create' | 'edit';
    schema?: any;
}

export {
    type InputProps,
    type SelectProps,
    type SelectOption,
    type DatePickerProps,
    type ValidationRule,
    type FormField,
    type FormTab,
    type MainFormProps,
};