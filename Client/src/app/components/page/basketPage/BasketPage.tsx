import { Box } from "@mui/system";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  getBasketItemsList,
  getBasketQuntity,
} from "../../../store/selectors/basketSelector";
import { IBasketCard } from "../../../types/types";
import List from "../../common/List";
import BasketCard from "../../ui/basketCard/BasketCard";
import styles from "./basketPage.module.css";
import config from "../../../config/default.json";
import { Button, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import { cleareBasket } from "../../../store/reducers/BasketSlice";

const BasketPage: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getBasketItemsList());
  const { cartTotalAmount, entities } = useAppSelector(getBasketQuntity());

  const handleClick = () => {
    toast.info("Thanks for the order.", {
      theme: "colored",
      icon: <DoneIcon />,
    });
    dispatch(cleareBasket());
  };

  return (
    <div className={styles.basket}>
      {entities.length > 0 ? (
        <>
          <Box className={styles.basket__body}>
            <List
              items={items}
              renderItem={(item: IBasketCard) => (
                <BasketCard
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  totalAmount={item.totalAmount}
                  image={item.image}
                  amount={item.amount}
                  totalPrice={item.totalPrice}
                />
              )}
            />
          </Box>
          <Box className={styles.basket__total}>
            <Typography>
              Total price: {config.currency}
              {cartTotalAmount}
            </Typography>
          </Box>
          <Box className={styles.basket__actions}>
            <Button onClick={handleClick} variant="contained">
              Order
            </Button>
          </Box>
        </>
      ) : (
        <Box>{<h2>{"Empty..."}</h2>}</Box>
      )}
    </div>
  );
};

export default BasketPage;
