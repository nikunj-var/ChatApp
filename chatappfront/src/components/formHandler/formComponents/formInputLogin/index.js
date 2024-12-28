import classNames from "classnames";
import { getElementError } from "../../getElementError";
import styles from "./index.module.scss";
import React from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormContext } from "react-hook-form";

const FormInputLogin = ({
  label,
  placeholder,
  name,
  type,
  className,
  restProps,
  isPassword,
  isLoginIdInput,
}) => {
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;
  const error = getElementError({ name, errors });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleEyeClick = (e) => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {" "}
      <div
        className={classNames(styles.formInput, className, {
          [styles.error]: !!error,
        })}
      >
        {label && <label>{label ?? placeholder}</label>}
        <div
          className={classNames({
            [styles.inputDiv]: isPassword | isLoginIdInput,
          })}
        >
          <input
            {...(register ? register(name) : {})}
            {...restProps}
            placeholder={placeholder}
            {...(type && { type })}
            onWheel={(e) => e?.target?.blur()}
            {...(type === "number" && { step: "any" })}
            {...(isPassword && { type: showPassword ? "text" : "password" })}
          />
          {isPassword && (
            <div onClick={handleEyeClick}>
              {showPassword ? (
                <AiFillEye
                  className={classNames(
                    showPassword ? "ri-eye-off-line" : "ri-eye-line",
                    styles.eye
                  )}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={classNames(
                    showPassword ? "ri-eye-off-line" : "ri-eye-line",
                    styles.eye
                  )}
                />
              )}
            </div>
          )}
          {isLoginIdInput && (
            <div className={styles.isLoginIdInput}> @ximkart.com </div>
          )}
        </div>

        {!!error && <p className={styles.errorMessage}>{error}</p>}
      </div>{" "}
    </>
  );
};

export default FormInputLogin;
