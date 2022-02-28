import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ICategories } from "../../../../models/ICategories";
import { Controller } from "react-hook-form";
import { FC } from "react";

interface InputSelectProps {
  options: ICategories[];
  name: string;
  label: string;
  type: string;
  control: any;
  setValue?: any;
}

const InputSelect: FC<InputSelectProps> = ({
  name,
  label,
  control,
  options,
}) => {
  const useStyles = makeStyles<Theme>((theme) => ({
    rootSelect: {
      margin: "0 0 20px 0",
      color: "red",
    },
  }));

  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl fullWidth className={classes.rootSelect}>
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={onChange}
            name={name}
            label={label}
            value={value || ""}
          >
            {options.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          <Box>{error ? error.message : ""}</Box>
        </FormControl>
      )}
    />
  );
};

export default InputSelect;
