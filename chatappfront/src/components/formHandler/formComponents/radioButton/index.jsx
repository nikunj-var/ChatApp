import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const RadioButton = ({ name, className }) => {
  const { setValue } = useFormContext();
  const value = useWatch({ name });

  const handleChange = () => {
    setValue(name, !value);
  };

  return (
    <>
      <input
        type="checkbox"
        checked={value}
        // onChange={(e)=>setValue(e?.target?.checked)}
        onClick={handleChange}
        className={className}
      />
    </>
  );
};

export default RadioButton;
