import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { getManufacturers } from "../../../../store/selectors/manufacturersSelector";
import Form from "../Form";
import InputCheckmarks from "../react-form-hook-components/InputCheckmarks";

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
    </Form>
  );
};

export default FilterForm;
