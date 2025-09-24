import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Input from './input';
import Select from './Select';
import DatePicker from './Datepicker';
import { type MainFormProps, type FormField } from '../../core/Interface/Form';

const MainForm = ({
  fields = [],
  tabs,
  onSubmit,
  onCancel,
  isLoading = false,
  defaultValues = {},
  title,
  description,
  mode = 'create',
}: MainFormProps) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const form = { watch };

  const watchedValues = watch();

  console.log(watchedValues)

  const onSubmitForm = (data: any) => {
    onSubmit(data);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'textarea':
        return (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type as 'text' | 'email' | 'password' | 'number' | 'textarea'}
            placeholder={field.placeholder}
            required={typeof field.required === 'function' ? field.required(form) : field.required}
            disabled={field.disabled}
            readOnly={field.readOnly}
            description={field.description}
            control={control}
            validation={field.validation}
            error={errors[field.name] as any}
          />
        );

      case 'select':
        return (
          <Select
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            required={typeof field.required === 'function' ? field.required(form) : field.required}
            disabled={field.disabled}
            description={field.description}
            control={control}
            validation={field.validation}
            error={errors[field.name] as any}
            options={field.options || []}
            mode={field.mode}
            allowClear={field.allowClear}
            showSearch={field.showSearch}
            loading={field.loading}
          />
        );

      case 'datepicker':
        return (
          <DatePicker
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            required={typeof field.required === 'function' ? field.required(form) : field.required}
            disabled={field.disabled}
            description={field.description}
            control={control}
            validation={field.validation}
            error={errors[field.name] as any}
            format={field.format}
            showTime={field.showTime}
            allowClear={field.allowClear}
            size={field.size}
          />
        );

      case 'separator':
        return <Divider key={field.name} />;

      default:
        return (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            type="text"
            placeholder={field.placeholder}
            required={typeof field.required === 'function' ? field.required(form) : field.required}
            disabled={field.disabled}
            readOnly={field.readOnly}
            description={field.description}
            control={control}
            validation={field.validation}
            error={errors[field.name] as any}
          />
        );
    }
  };

  const renderFields = (fieldsToRender: FormField[]) => {
    return fieldsToRender.map((field) => {
      if (field.visibleWhen && !field.visibleWhen(watchedValues)) {
        return null;
      }

      return renderField(field);
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      {(title || description) && (
        <>
          <div className="p-6 pb-0">
            {title && (
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 text-sm">
                {description}
              </p>
            )}
          </div>
          <Divider style={{ margin: '16px 0' }} />
        </>
      )}

      <div className="p-6 pt-0">
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {/* Render tabs or fields directly */}
          {tabs ? (
            <div>
              {/* TODO: Implement tabs with Ant Design Tabs component */}
              {tabs.map((tab) => (
                <div key={tab.key} className="space-y-4">
                  <h3 className="text-lg font-medium">{tab.label}</h3>
                  {renderFields(tab.fields)}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {renderFields(fields)}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            {onCancel && (
              <Button onClick={onCancel} size="middle">
                Cancel
              </Button>
            )}
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              icon={isLoading ? <LoadingOutlined /> : undefined}
              size="middle"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading
                ? mode === 'edit'
                  ? 'Updating...'
                  : 'Creating...'
                : mode === 'edit'
                ? 'Update'
                : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default memo(MainForm);