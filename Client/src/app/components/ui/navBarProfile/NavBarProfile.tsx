import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { getUserData } from "../../../store/selectors/authSelector";
import config from "../../../config/default.json";
import styles from "./navBarProfile.module.css";
import localStorageService from "../../../service/localStorage.service";

const NavBarProfile: FC = () => {
  const [archonElement, setArchonElement] = useState<null | HTMLElement>(null);
  const user = useAppSelector(getUserData());
  const adminId = config.adminId;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setArchonElement(event.currentTarget);
  };

  const handleClose = () => {
    setArchonElement(null);
  };

  return (
    <div className={styles.navProfiel}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt="Remy Sharp" src={user?.image} />
      </IconButton>
      <Menu
        id="menu-appbar"
        className={styles.profileMenu}
        anchorEl={archonElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
        open={!!archonElement}
      >
        {adminId === localStorageService.getUserId() ? (
          <Link to={"Admin"}>
            <MenuItem onClick={handleClose}>Admin</MenuItem>
          </Link>
        ) : (
          ""
        )}

        <Link to={"logOut"}>
          <MenuItem onClick={handleClose}>LogOut</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default NavBarProfile;
