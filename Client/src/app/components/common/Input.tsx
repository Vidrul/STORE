import React, { FC } from "react";
import { TextField } from "@mui/material";

interface onChangeProp {
  name: string;
  value: string;
}

interface TextFieldProps {
  value: string | number;
  type: string;
  onChange: (obj: onChangeProp) => void;
  name: string;
  label: string | null;
  size: "small" | "medium" | undefined;
}

const Input: FC<TextFieldProps> = ({
  value,
  type,
  onChange,
  name,
  label,
  size,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ name: name, value: value });
  };

  return (
    <>
      <TextField
        name={name}
        id={name}
        value={value}
        type={type}
        onChange={handleChange}
        label={label}
        variant="outlined"
        fullWidth={true}
        autoComplete="off"
        size={size}
      />
    </>
  );
};

export default Input;
