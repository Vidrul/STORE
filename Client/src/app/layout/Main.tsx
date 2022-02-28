import { Container, IconButton, Paper } from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TextField from "../components/common/Input";
import { NavBar } from "../components/ui/navbar/NavBar";
import SearchIcon from "@mui/icons-material/Search";
import { getBasketQuntity } from "../store/selectors/basketSelector";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getTotalQuantityAndAmount } from "../store/reducers/BasketSlice";
import Login from "./Login/Login";
import { getAuthorizedUserStatus } from "../store/selectors/authSelector";
import AppLoader from "../components/ui/hoc/AppLoader";

export const Main: FC = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const { entities } = useAppSelector(getBasketQuntity());
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const loginStatus = useAppSelector(getAuthorizedUserStatus());

  useEffect(() => {
    setIsOpen(false);
  }, [loginStatus]);

  const handleQuery = ({ value }: { name: string; value: string }) => {
    setQuery(value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`${query}`);
    setQuery("");
  };

  useEffect(() => {
    dispatch(getTotalQuantityAndAmount());
  }, [entities, dispatch]);

  return (
    <>
      <NavBar onOpen={handleOpen} />
      <AppLoader>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ mb: 3, display: "flex", alignItems: "center" }}
          >
            <TextField
              label="Search product"
              type="text"
              value={query}
              name="query"
              onChange={handleQuery}
              size="medium"
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Outlet context={{ query: query }} />
        </Container>
        <Login isOpen={isOpen} onClose={handleClose} />
      </AppLoader>
    </>
  );
};
