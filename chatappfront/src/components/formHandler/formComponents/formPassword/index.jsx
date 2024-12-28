import React from "react";
import { getElementError } from "../../getElementError";
import classNames from "classnames";
import styles from "./index.module.scss";

const FormInputPassword = ({
  label,
  placeholder,
  name,
  otherProps,
  register,
  errors,
  trailingIcon,
  onPasswordVisibleIcon,
  subtext,
}) => {
  const error = getElementError({ name, errors });
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className={classNames(styles.formInput, { [styles.error]: !!error })}>
      {label && <label>{label ?? placeholder}</label>}
      <div className={styles.inputDiv}>
        <input
          {...(register ? register(name) : {})}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          {...otherProps}
        />
        <span
          onClick={(e) => {
            e.stopPropagation(); // This prevents the click event from propagating
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? trailingIcon : onPasswordVisibleIcon}
        </span>
      </div>
      {subtext && <sub>{subtext}</sub>}
      {!!error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
export default FormInputPassword;
