import React from "react";
import classNames from "classnames";
import { useController } from "react-hook-form";
import styles from "./index.module.scss";
import { getElementError } from "../../getElementError";
import useClickOutside from "utils/useClickOutside";

const FormMultiSelect = ({
  label,
  options = [],
  name,
  className,
  defaultValue,
  errors,
  placeholder,
  disabled,
  showEnglish,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    defaultValue: defaultValue || [],
    rules: { required: true },
  });
  const error = getElementError({ name, errors });

  const [showOptions, setShowOptions] = React.useState(false);
  const ref = React.useRef();
  useClickOutside(ref, () => setShowOptions(false));

  const handleSelect = (selectedValue) => {
    if (disabled) return;

    const selectedValues = Array.isArray(value) ? [...value] : [];

    if (selectedValues.includes(selectedValue)) {
      const index = selectedValues.indexOf(selectedValue);
      selectedValues.splice(index, 1);
    } else {
      selectedValues.push(selectedValue);
    }

    onChange(selectedValues);
  };

  const getLabel = () => {
    if (value.length === 1) {
      const selectedOption = options.find(
        (option) => option.title === value[0]
      );
      return selectedOption
        ? showEnglish
          ? selectedOption?.english
          : selectedOption.title
        : "";
    } else if (value.length > 1) {
      return `${value.length} Selected`;
    } else {
      return "";
    }
  };

  return (
    <div
      className={classNames({
        [styles.errorMessage]: error,
      })}
    >
      {label && <label className={styles.topLabel}>{label}</label>}
      <div
        className={classNames(styles.multiSelect, className, {
          [styles.disabled]: disabled,
          [styles.errorBackground]: error,
        })}
        onClick={() => {
          if (!disabled) setShowOptions((prev) => !prev);
        }}
        ref={ref}
      >
        <div
          className={classNames(
            styles.displaySelected,
            {
              [styles.isMultiSelected]: value?.length > 1,
            },
            {
              [styles.error]: !!error,
            }
          )}
        >
          {value?.length > 0 ? getLabel() : placeholder}
        </div>
        <div
          className={classNames(styles.optionsList, {
            [styles.showOptionList]: showOptions,
          })}
        >
          {options.length > 0 ? (
            options.map((option, id) => (
              <label key={id} onClick={(e) => e?.stopPropagation()}>
                <input
                  type="checkbox"
                  value={option.title}
                  checked={value?.includes(option?.title)}
                  onChange={() => handleSelect(option?.title)}
                  disabled={disabled}
                />
                {option.english}
              </label>
            ))
          ) : (
            <label>No data available</label>
          )}
        </div>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FormMultiSelect;
