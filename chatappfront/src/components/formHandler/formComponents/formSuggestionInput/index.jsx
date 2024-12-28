import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { getElementError } from "../../getElementError";
import { useFormContext } from "react-hook-form";
import Input from "v2/components/input";
import useClickOutside from "utils/useClickOutside";

const FormSuggestion = ({
  label,
  name,
  className,
  suggestions,
  errors,
  placeholder,
  disabled,
  restProps,
}) => {
  const error = getElementError({ name, errors });
  const [showDropdown, setShowDropdown] = React.useState(false);
  const { register, setValue, watch, setError } = useFormContext();
  const [inputValue, setInputValue] = React.useState("");
  const selectedValue = watch(name);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setValue(name, suggestion);
    setShowDropdown(false);
    setError(name, { type: "" });
  };

  const filteredSuggestions = suggestions?.filter((suggestion) => {
    if (typeof suggestion === "string") {
      return suggestion?.toLowerCase()?.includes(inputValue?.toLowerCase());
    }
    return false;
  });

  const ref = React.useRef();
  useClickOutside(ref, () => {
    setShowDropdown(false);
  });

  return (
    <>
      <div
        className={classNames(styles.suggestionInput, className, {
          [styles.error]: !!error,
        })}
        ref={ref}
      >
        <Input
          type="text"
          {...register(name)}
          value={selectedValue || inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          restProps={{
            onFocus: (e) => setShowDropdown(true),
          }}
          label={label}
          readOnly={disabled}
          {...restProps}
        />

        {showDropdown && suggestions && suggestions.length && !disabled > 0 && (
          <div className={styles.options}>
            {filteredSuggestions?.map((suggestion, idx) => (
              <p key={idx} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </p>
            ))}
          </div>
        )}

        {!!error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </>
  );
};
export default FormSuggestion;
