import React, { FC } from "react";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { ICategories } from "../../../../models/ICategories";

interface InputCheckmarksProps {
  options: ICategories[];
  name: string;
  label: string;
  control: any;
  setValue?: any;
  onChange?: any;
}

const InputCheckmarks: FC<InputCheckmarksProps> = ({
  name,
  options,
  label,
  control,
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            multiple
            value={value || ""}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => {
              return selected
                .map((value: string) => {
                  for (const iterator of options) {
                    if (iterator._id === value) return iterator.name;
                  }
                  return value;
                })
                .join(", ");
            }}
            MenuProps={MenuProps}
          >
            {options.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default InputCheckmarks;
