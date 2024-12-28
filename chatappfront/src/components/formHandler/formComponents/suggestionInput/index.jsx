import React from "react"; 
import { useFormContext, useWatch,useForm ,FormProvider} from "react-hook-form";
import SuggestionInput from "v2/components/suggestionInput";

const FormSuggestionInput = ({
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
  onSelect,
  setValue,
  value,
}) => {
  return (
    <SuggestionInput
    name={name} 
    value={value}
    onChange={onChange}
    label={label}
    placeholder={placeholder}
    list={list}
    showDropdown={showDropdown}
    setShowDropdown={setShowDropdown}
    containerRef={containerRef}
    className={className}
    inputClassName={inputClassName}
    onSelect={onSelect}
  >
    {children}
  </SuggestionInput>
  );
};

export default FormSuggestionInput;
