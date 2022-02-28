import { FC, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getCurrentCategoryById } from "../../../store/selectors/categoriesSelector";
import { addProductToBasket } from "../../../store/reducers/BasketSlice";

interface GridCardProps {
  image: string;
  name: string;
  manufacturer: string;
  _id: string;
  categoryId: string;
  price: number;
}

const GridCard: FC<GridCardProps> = ({
  image,
  name,
  manufacturer,
  _id,
  categoryId,
  price,
}) => {
  const category = useAppSelector(getCurrentCategoryById(categoryId));
  const [prodState, setProdState] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setProdState(true);
    dispatch(
      addProductToBasket({
        _id,
        image,
        name,
        price,
        totalPrice: price,
        amount: 1,
      })
    );
  };
  return (
    <Card className={styles.card}>
      <CardActionArea className={styles.card__content}>
        <Link to={`/${category?._id}/${manufacturer}/${_id}`}>
          <CardMedia component="img" image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions className={styles.card__actions}>
        {prodState ? (
          <Button fullWidth variant="contained">
            <Link to="/basket">Go to basket</Link>
          </Button>
        ) : (
          <Button fullWidth onClick={handleClick} variant="contained">
            Buy
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default GridCard;
