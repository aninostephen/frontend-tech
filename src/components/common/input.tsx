import { Input as AntdInput } from 'antd';
import { Controller } from 'react-hook-form';
import { type InputProps } from '../../core/Interface/Form';

const Input = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  description,
  rows = 4,
  control,
  validation,
  error,
}: InputProps) => {
  const getValidationRules = () => {
    const rules: any = {};

    if (required || validation?.required) {
      rules.required = `${label} is required`;
    }

    if (validation?.minLength) {
      rules.minLength = {
        value: validation.minLength,
        message: `${label} must be at least ${validation.minLength} characters`,
      };
    }

    if (validation?.maxLength) {
      rules.maxLength = {
        value: validation.maxLength,
        message: `${label} must not exceed ${validation.maxLength} characters`,
      };
    }

    if (validation?.pattern) {
      rules.pattern = {
        value: validation.pattern,
        message: `${label} format is invalid`,
      };
    }

    if (validation?.min && (type === 'number')) {
      rules.min = {
        value: validation.min,
        message: `${label} must be at least ${validation.min}`,
      };
    }

    if (validation?.max && (type === 'number')) {
      rules.max = {
        value: validation.max,
        message: `${label} must not exceed ${validation.max}`,
      };
    }

    if (validation?.validate) {
      rules.validate = validation.validate;
    }

    // Email validation
    if (type === 'email') {
      rules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: `${label} must be a valid email address`,
      };
    }

    return rules;
  };

  const renderInput = (field: any) => {
    const inputProps = {
      ...field,
      placeholder,
      disabled,
      readOnly,
      status: error ? 'error' : undefined,
    };

    switch (type) {
      case 'textarea':
        return <AntdInput.TextArea {...inputProps} rows={rows} />;
      
      case 'password':
        return <AntdInput.Password {...inputProps} />;
      
      case 'email':
      case 'number':
      case 'text':
      default:
        return (
          <AntdInput
            {...inputProps}
            type={type === 'email' ? 'email' : type === 'number' ? 'number' : 'text'}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {(required || validation?.required) && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      
      <Controller
        name={name}
        control={control}
        rules={getValidationRules()}
        render={({ field }) => renderInput(field)}
      />
      
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error.message}
        </div>
      )}
      
      {description && (
        <div className="text-gray-500 text-sm mt-1">
          {description}
        </div>
      )}
    </div>
  );
};

export default Input;
