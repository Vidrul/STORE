import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { FC } from "react";
import { IBasketCard } from "../../../types/types";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import config from "../../../config/default.json";
import styles from "./basketCard.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  addProductToBasket,
  decreaseQuantity,
  removeProductFromBasket,
} from "../../../store/reducers/BasketSlice";
import { Link } from "react-router-dom";
import { getCurrentProduct } from "../../../store/selectors/goodsSelectors";

const BasketCard: FC<IBasketCard> = ({
  _id,
  name,
  price,
  totalAmount,
  totalPrice,
  image,
  amount,
}) => {
  const currency = config.currency;
  const dispatch = useAppDispatch();
  const product = useAppSelector(getCurrentProduct(_id));

  const handleIncrement = () => {
    dispatch(
      addProductToBasket({
        _id,
        name,
        price,
        totalAmount,
        totalPrice,
        image,
        amount,
      })
    );
  };

  const handleDicrement = () => {
    if (amount > 1) {
      dispatch(decreaseQuantity(_id));
    } else {
      dispatch(removeProductFromBasket(_id));
    }
  };

  const handleRemove = () => {
    dispatch(removeProductFromBasket(_id));
  };

  return (
    <Card className={styles.card}>
      <Box className={styles.card__header}>
        <img src={image} alt={name} className={styles.card__image} />
        <Box className={styles.card__header_body}>
          <Link to={`/mouse/${product?.manufacturer}/${_id}`}>{`${name}`}</Link>
          <Typography>Product code: {_id}</Typography>
        </Box>
      </Box>
      <CardContent className={styles.card__body}>
        <CardActions>
          <Button size="small" onClick={handleDicrement}>
            <RemoveCircleOutlineOutlinedIcon />
          </Button>
        </CardActions>
        <Typography variant="body2" color="text.secondary">
          {amount}
        </Typography>
        <CardActions>
          <Button size="small" onClick={handleIncrement}>
            <AddCircleOutlineTwoToneIcon />
          </Button>
        </CardActions>
      </CardContent>
      <Box className={styles.card__footer}>
        <Typography variant="h5" color="text.secondary">
          Total:{currency}
          {totalPrice}
        </Typography>
        <IconButton className={styles.button__delete} onClick={handleRemove}>
          <DeleteOutlineOutlinedIcon color="error" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default BasketCard;
