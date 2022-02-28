import React, { FC } from "react";
import style from "./form.module.css";

interface FormProps {
  onSubmit?: () => void;
}

const Form: FC<FormProps> = ({ children, ...props }) => {
  return (
    <form {...props} autoComplete={"off"} className={style.form}>
      {children}
    </form>
  );
};

export default Form;
