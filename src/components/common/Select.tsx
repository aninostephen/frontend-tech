import { Select as AntdSelect } from 'antd';
import { Controller } from 'react-hook-form';
import type { SelectProps } from '../../core/Interface/Form';

const Select = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  description,
  control,
  validation,
  error,
  options = [],
  mode,
  allowClear = true,
  showSearch = true,
  loading = false,
}: SelectProps) => {
  const getValidationRules = () => {
    const rules: any = {};

    if (required || validation?.required) {
      rules.required = `${label} is required`;
    }

    if (validation?.validate) {
      rules.validate = validation.validate;
    }

    return rules;
  };

  const renderSelect = (field: any) => {
    const selectProps = {
      ...field,
      placeholder,
      disabled,
      status: error ? 'error' : undefined,
      allowClear,
      showSearch,
      loading,
      mode,
      style: { width: '100%' },
    };

    return (
      <AntdSelect {...selectProps}>
        {options.map((option) => (
          <AntdSelect.Option key={option.value} value={option.value}>
            {option.label}
          </AntdSelect.Option>
        ))}
      </AntdSelect>
    );
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
        render={({ field }) => renderSelect(field)}
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

export default Select;