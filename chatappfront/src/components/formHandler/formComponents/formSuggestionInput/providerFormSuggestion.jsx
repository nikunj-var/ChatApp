import React from "react";
import FormSuggestion from ".";
import { useFormContext } from "react-hook-form";

const FormProviderSuggestionInput = ({
  label,
  name,
  className,
  suggestions,
  placeholder,
  restProps,
  disabled,
}) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormSuggestion
      {...{
        label,
        name,
        className,
        suggestions,
        errors,
        placeholder,
        restProps,
        disabled,
        register
      }}
      {...methods}
    />
  );
};
export default FormProviderSuggestionInput;
