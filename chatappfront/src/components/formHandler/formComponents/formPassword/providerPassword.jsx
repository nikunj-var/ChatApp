import React from "react";
import { useFormContext } from "react-hook-form";
import FormInputPassword from ".";


const FormProviderInputPassword = ({
  label,
  placeholder,
  name,
  otherProps,
  className,
  trailingIcon,
  onPasswordVisibleIcon,
  subtext,
 
}) => {
  const methods = useFormContext();

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormInputPassword
      {...{
        label,
        placeholder,
        name,
        otherProps,
        register,
        errors,
        className,
        trailingIcon,
        onPasswordVisibleIcon,
        subtext,
      
      }}
      {...methods}
    />
  );
};

export default FormProviderInputPassword;
