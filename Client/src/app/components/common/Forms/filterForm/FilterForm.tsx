import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { getManufacturers } from "../../../../store/selectors/manufacturersSelector";
import Form from "../Form";
import InputCheckmarks from "../react-form-hook-components/InputCheckmarks";
import Input from "../react-form-hook-components/Input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import style from "./style.module.css";
import { Box, IconButton } from "@mui/material";

interface FilterFormProps {
  control?: any;
  onSubmit?: () => void;
}

const FilterForm: FC<FilterFormProps> = ({ control, onSubmit }) => {
  const manufacturersList = useAppSelector(getManufacturers());

  return (
    <Form onSubmit={onSubmit}>
      <InputCheckmarks
        options={manufacturersList}
        control={control}
        name="manufacturer"
        label="Manufacturer"
      />
      <Box className={style.form__price}>
        <Input
          name={"minPrice"}
          label={"$"}
          type={"number"}
          control={control}
        />
        {<p>to</p>}
        <Input
          name={"maxPrice"}
          label={"$"}
          type={"number"}
          control={control}
        />
        <IconButton type="submit">
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Form>
  );
};

export default FilterForm;
