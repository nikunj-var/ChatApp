import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

/**
 * The FormWrapper component is a wrapper component that provides form
 * functionality using the react-hook-form library. It handles form submission,
 * validation, and provides form state and control to its child components.
 *
 * @param {React.ReactNode} children :  The child components rendered inside the form.
 * @param {Object} [schemaValidation] : The Yup schema object used for form validation.
 * @param {Function} onSubmit : The function to be executed when the form is submitted.
 * @param {Object} [defaultValues] : The default values to populate the form fields.
 * @param {Object} [values] : The values to populate the form fields. (Optional)
 * @returns
 */
const FormWrapper = ({
  children,
  schemaValidation,
  onSubmit,
  defaultValues = {},
  values = {},
}) => {
  const {
    formState: { errors },
    formState,
    register,
    handleSubmit,
    setError,
    getFieldState,
    getValues,
    setValue,
    resetField,
    control,
  } = useForm({
    reValidateMode: "onChange",
    shouldFocusError: true,
    ...(schemaValidation && { resolver: yupResolver(schemaValidation) }),
    defaultValues,
    values,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children?.map(children, (child) => {
        return child?.props?.name
          ? React.cloneElement(child, {
              register,
              errors,
              setError,
              getFieldState,
              getValues,
              setValue,
              resetField,
              formState,
              control,
            })
          : child;
      })}
    </form>
  );
};

export default FormWrapper;
