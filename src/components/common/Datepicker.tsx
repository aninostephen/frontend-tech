import { DatePicker as AntdDatePicker } from 'antd';
import { Controller } from 'react-hook-form';
import type { DatePickerProps } from '../../core/Interface/Form';
import dayjs from 'dayjs';

const DatePicker = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  description,
  control,
  validation,
  error,
  format = 'YYYY-MM-DD',
  showTime = false,
  allowClear = true,
  size = 'middle',
}: DatePickerProps) => {
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

  const renderDatePicker = (field: any) => {
    const datePickerProps = {
      ...field,
      placeholder,
      disabled,
      status: error ? 'error' : undefined,
      allowClear,
      size,
      format,
      showTime,
      style: { width: '100%' },
      // Convert string values to dayjs objects for display
      value: field.value ? dayjs(field.value) : null,
      // Convert dayjs objects back to string values
      onChange: (date: any) => {
        field.onChange(date ? date.format(format) : null);
      },
    };

    return <AntdDatePicker {...datePickerProps} />;
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
        render={({ field }) => renderDatePicker(field)}
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

export default DatePicker;
