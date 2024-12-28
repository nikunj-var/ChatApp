import React from "react";
import FormSuggestionInput from ".";
import { useFormContext } from "react-hook-form";

const FormProviderSuggestion = ({
  name,
  list,
  label,
  onChange,
  children,
  placeholder,
  containerRef,
  className,
  showDropdown,
  setShowDropdown,
  inputClassName,
}) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;
  return (
    <FormSuggestionInput
      {...{
        name,
        list,
        label,
        onChange,
        children,
        placeholder,
        containerRef,
        className,
        showDropdown,
        setShowDropdown,
        inputClassName,
      }}
    />
  );
};
export default FormProviderSuggestion;
