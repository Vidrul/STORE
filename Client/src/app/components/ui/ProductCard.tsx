import { FC } from "react";
import config from "../../config/default.json";
import {
  Box,
  Button,
  Card as CardMui,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface CardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  manufacturer: string;
  amount: number;
}

const Card: FC<CardProps> = ({
  image,
  name,
  price,
  id,
  manufacturer,
}) => {
  
  const currency = config.currency;

  return (
    <CardMui
      sx={{
        width: "100%",
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1976d2",
        p: 0.5,
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 400,
          color: "#fff",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          sx={{ width: "30%", borderRadius: "10%" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography sx={{ mb: 2 }}>{name}</Typography>
          <Typography>
            Cost: {price}
            {currency}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <Link to={`${manufacturer}/${id}`}>
          <Button sx={{ color: "#fff" }}>Open</Button>
        </Link>
      </CardActions>
    </CardMui>
  );
};

export default Card;
