import React, { ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import { GroupuiInput, GroupuiTextarea } from '@group-ui/group-ui-react';

const requiredRule = (fieldName: string) => ({ value: true, message: `${fieldName} is required` });

const defaultProps = {
  type: 'text',
  required: false,
  rules: {},
};

interface InputProps {
  name: string,
  control: Control<any>,
  placeholder: string,
  label: string,
  type?: 'text' | 'email' | 'textarea',
  required?: boolean,
  rules?: object,
}

const TextInput = ({
  name, control, placeholder, label, type, required, rules,
}: InputProps): ReactElement => (
  <Controller
    name={name}
    control={control}
    rules={{
      ...rules,
      required: required ? requiredRule(label) : undefined,
    }}
    render={({ field, fieldState: { error } }) => {
      const children = (
        <>
          <span slot="label">{`${label}${required ? ' *' : ''}`}</span>
          {error && <span slot="description">{error.message}</span>}
        </>
      );
      const fieldProps = {
        ref: field.ref,
        value: field.value,
        name: field.name,
        onGroupuiChange: field.onChange,
        severity: error ? 'danger' : undefined,
        placeholder,
        children,
      };

      return type === 'textarea'
        ? <GroupuiTextarea rows={3} {...fieldProps} />
        : <GroupuiInput type={type} {...fieldProps} />;
    }}
  />
);

TextInput.defaultProps = defaultProps;

export default TextInput;
