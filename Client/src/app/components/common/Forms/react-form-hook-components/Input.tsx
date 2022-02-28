import { Box, TextField } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type: string;
  control: any;
  setValue?: any;
}

const Input: FC<InputProps> = ({ name, label, control, type }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <Box>
            <TextField
              type={type}
              value={value || ""}
              label={label}
              onChange={onChange}
              autoComplete={"off"}
              fullWidth
            />
            <Box>{error ? error.message : ""}</Box>
          </Box>
        )}
      />
    </>
  );
};

export default Input;
