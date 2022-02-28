import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Badge,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import {
  getAuthorizedUserDataLoadStatus,
  getLoadingStatus,
} from "../../../store/selectors/authSelector";
import { getBasketQuntity } from "../../../store/selectors/basketSelector";
import CircularIndeterminate from "../../common/loaders/CircleLoader";

import NavBarProfile from "../navBarProfile/NavBarProfile";
import styles from "./navBar.module.css";

interface NavBarProps {
  onOpen: () => void;
}

export const NavBar: FC<NavBarProps> = ({ onOpen }) => {
  const { cartTotalQuantity } = useAppSelector(getBasketQuntity());
  const userDataStatus = useAppSelector(getAuthorizedUserDataLoadStatus());
  const isLoading = useAppSelector(getLoadingStatus());
  

  return (
    <AppBar className={styles.navBar} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/"}>
          <Typography>Main</Typography>
        </Link>
        <Box className={styles.navBar__profile}>
          <Link to={"/basket"}>
            <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={cartTotalQuantity} color={"secondary"}>
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </Link>
          {isLoading ? (
            <CircularIndeterminate />
          ) : userDataStatus ? (
            <NavBarProfile />
          ) : (
            <Button onClick={onOpen} color="inherit">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
