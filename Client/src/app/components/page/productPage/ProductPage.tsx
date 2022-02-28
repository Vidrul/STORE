import { Box, Button, Paper } from "@mui/material";
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import config from "../../../config/default.json";
import styles from "./product.module.css";
import { getCurrentProduct } from "../../../store/selectors/goodsSelectors";
import ProductHistory from "../../ui/productHistory/ProductHistory";
import { addProductToBasket } from "../../../store/reducers/BasketSlice";

const ProductPage: FC = () => {
  const { id } = useParams();
  const product = useAppSelector(getCurrentProduct(id!));
  const currensy = config.currency;
  const [prodState, setProdState] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setProdState(true);
    dispatch(
      addProductToBasket({
        _id: product?._id || "",
        image: product?.image || "",
        name: product?.name || "",
        price: product?.price || 0,
        totalAmount: product?.amount || 0,
        totalPrice: product?.price || 0,
        amount: 1,
      })
    );
  };

  return (
    <>
      {product ? (
        <>
          <ProductHistory
            manufacturerId={product.manufacturer}
            categoryId={product.category}
          />
          <Box className={styles.card} component={Paper}>
            <Box className={styles.card__header}>
              <img
                src={product?.image}
                alt={product?.name}
                className={styles.card__image}
              />
            </Box>
            <Box className={styles.card__body}>
              <ul>
                <li>Short description:</li>
                <li>Name: {product?.name}</li>
                <li>
                  Price: {product?.price}
                  {currensy}
                </li>
                <li>Amount: {product?.amount}</li>
              </ul>
            </Box>
            <Box className={styles.card__actions}>
              {prodState ? (
                <Button variant="contained">
                  <Link to="/basket">Go to basket</Link>
                </Button>
              ) : (
                <Button onClick={handleClick} variant="contained">
                  Buy
                </Button>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductPage;
