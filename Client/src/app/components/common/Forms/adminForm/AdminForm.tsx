import { Box, Button } from "@mui/material";
import Form from "../Form";
import { useForm } from "react-hook-form";
import { IGoods } from "../../../../models/IGoods";
import Input from "../react-form-hook-components/Input";
import InputSelect from "../react-form-hook-components/InputSelect";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getCategories } from "../../../../store/selectors/categoriesSelector";
import { getManufacturers } from "../../../../store/selectors/manufacturersSelector";
import { createNewProduct } from "../../../../store/reducers/GoodsSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("This field must be filled in"),
  category: yup.string().required("This field must be filled in"),
  manufacturer: yup.string().required("This field must be filled in"),
  image: yup.string().required("This field must be filled in"),
  price: yup
    .number()
    .positive()
    .integer()
    .required("This field must be filled in"),
  amount: yup
    .number()
    .positive()
    .integer()
    .required("This field must be filled in"),
});

const AdminForm = () => {
  const categoriesList = useAppSelector(getCategories());
  const manufacturersList = useAppSelector(getManufacturers());
  const dispatch = useAppDispatch();
  const { handleSubmit, control, setValue } = useForm<IGoods>({
    defaultValues: {
      name: "",
      category: "",
      manufacturer: "",
      image: "",
      price: 0,
      amount: 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IGoods) => {
    dispatch(createNewProduct(data));
    setValue("name", "");
    setValue("category", "");
    setValue("manufacturer", "");
    setValue("image", "");
    setValue("name", "");
    setValue("price", 0);
    setValue("amount", 0);
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" label="Name" control={control} type="text" />
        <InputSelect
          options={categoriesList}
          name="category"
          control={control}
          label="Category"
          type="text"
        />
        <InputSelect
          options={manufacturersList}
          name="manufacturer"
          control={control}
          label="Manufacturer"
          type="text"
        />

        <Input
          name={"image"}
          label="Product image url"
          control={control}
          type="url"
        />

        <Input
          name={"price"}
          label="Product price"
          control={control}
          type="number"
        />

        <Input
          name={"amount"}
          label="Product amount"
          control={control}
          type="number"
        />

        <Button fullWidth type="submit" variant="contained" color="success">
          Create
        </Button>
      </Form>
    </Box>
  );
};

export default AdminForm;
