import { Backdrop, Box, Button, Divider, Modal } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { IGoods } from "../../../../models/IGoods";
import {
  productRemove,
  updateProduct,
} from "../../../../store/reducers/GoodsSlice";
import { getCategories } from "../../../../store/selectors/categoriesSelector";
import { getCurrentProduct } from "../../../../store/selectors/goodsSelectors";
import { getManufacturers } from "../../../../store/selectors/manufacturersSelector";
import Form from "../Form";
import Input from "../react-form-hook-components/Input";
import InputSelect from "../react-form-hook-components/InputSelect";
import styles from "../form.module.css";

const ProductForm: FC = () => {
  const params = useParams();
  const id = params.id || "";

  const navigate = useNavigate();

  const poduct = useAppSelector(getCurrentProduct(id));
  const categories = useAppSelector(getCategories());
  const manufacturers = useAppSelector(getManufacturers());
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<IGoods>({
    defaultValues: {
      _id: poduct?._id,
      name: poduct?.name,
      category: poduct?.category,
      subcategory: poduct?.subcategory,
      manufacturer: poduct?.manufacturer,
      image: poduct?.image,
      price: poduct?.price,
      amount: poduct?.amount,
      createdAt: poduct?.createdAt,
      updatedAt: poduct?.updatedAt,
      __v: poduct?.__v,
    },
    mode: "onBlur",
  });

  const navigateAdminPage = () => {
    navigate(`/admin`);
  };

  const onSubmit = (data: IGoods) => {
    dispatch(updateProduct(data, navigateAdminPage));
  };

  const handleDelete = () => {
    dispatch(productRemove(id, navigateAdminPage));
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={true}
        onClose={navigateAdminPage}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box className={styles.box}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name={"name"}
              label="Product name"
              control={control}
              type="text"
            />
            <Divider />
            <InputSelect
              name={"category"}
              options={categories}
              label={"Categories"}
              type="text"
              control={control}
            />

            <InputSelect
              name={"manufacturer"}
              options={manufacturers}
              label={"Manufacturer"}
              type="text"
              control={control}
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

            <Box className={styles.form__actions}>
              <Button onClick={handleDelete} variant="contained" color="error">
                Delete
              </Button>
              <Button type="submit" variant="contained" color="success">
                Apply
              </Button>
            </Box>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductForm;
