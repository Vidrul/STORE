import { Box, Button, Paper } from "@mui/material";
import { FC } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks/redux";
import { IGoods } from "../../../models/IGoods";
import AdminForm from "../../common/Forms/adminForm/AdminForm";
import ProductForm from "../../common/Forms/product-form/ProductForm";
import Table from "../../common/table/Table";
import Category from "../../ui/Category";
import Manufacturer from "../../ui/Manufacturer";
import styles from "./adminPage.module.css";

const AdminPage: FC = () => {
  const { entities } = useAppSelector((state) => state.goods);

  const columns = {
    name: {
      path: "name",
      name: "Name",
    },

    category: {
      name: "Category",
      component: (product: IGoods) => (
        <Category categoryId={product.category} />
      ),
    },

    manufacturer: {
      name: "Manufacturer",
      component: (product: IGoods) => (
        <Manufacturer manufacturerId={product.manufacturer} />
      ),
    },

    image: {
      path: "image",
      name: "Image",
    },

    price: {
      path: "price",
      name: "Price",
    },

    amount: {
      path: "amount",
      name: "Amount",
    },

    editButton: {
      component: (product: IGoods) => (
        <Link to={`/admin/${product._id}`}>
          <Button variant="contained">Edit</Button>
        </Link>
      ),
    },
  };

  return (
    <Box className={styles.wrapper}>
      <Paper className={styles.side_menu}>
        <AdminForm />
      </Paper>
      <Table items={entities} columns={columns} />
      <Routes>
        <Route path=":id" element={<ProductForm />} />
      </Routes>
    </Box>
  );
};

export default AdminPage;
