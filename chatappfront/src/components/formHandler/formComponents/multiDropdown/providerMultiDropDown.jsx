import React from "react";
import FormMultiSelect from ".";
import { useFormContext } from "react-hook-form";

const FormProviderMultiSelect = ({
  label,
  options,
  name,
  placeholder,
  restProps,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormMultiSelect
      label={label}
      options={options}
      name={name}
      className={className}
      register={register}
      errors={errors}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

export default FormProviderMultiSelect;
