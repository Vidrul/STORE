import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";

interface InputPassProps {
  label: string;
  control: any;
  name: string;
}

const InputPass: FC<InputPassProps> = ({ label, control, name }) => {
  const [inputType, setInputType] = useState<string>("password");

  const handleClickShowPassword = () => {
    setInputType((prevState) => (prevState === "text" ? "password" : "text"));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl variant="outlined" fullWidth>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput
            name={name}
            type={inputType === "text" ? "text" : "password"}
            value={value || ""}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {inputType === "text" ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
          <Box>{error ? error.message : ""}</Box>
        </FormControl>
      )}
    />
  );
};

export default InputPass;
