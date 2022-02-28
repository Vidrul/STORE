import {
  Backdrop,
  Fade,
  Modal,
  Box,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/common/Forms/login-form/LoginForm";
import RegisterForm from "../../components/common/Forms/registerFrom/RegisterForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeAuthError } from "../../store/reducers/AuthSlice";
import { getAuthError } from "../../store/selectors/authSelector";
import styles from "./login.module.css";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: FC<LoginProps> = ({ isOpen, onClose }) => {
  const [isType, setIsType] = useState<string>("singIn");
  const error = useAppSelector(getAuthError());
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsType((prevState: string) =>
      prevState === "singIn" ? "singUp" : "singIn"
    );
    dispatch(removeAuthError());
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={styles.box}>
          {isType === "singIn" ? <LoginForm /> : <RegisterForm />}
          {error ? <Typography>{error}!</Typography> : ""}
          <Divider />
          <Button color="success" onClick={handleClick} variant="contained">
            {isType === "singIn"
              ? "Create new account"
              : "Already have account ?"}
          </Button>
          {isType === "singIn" ? (
            <Link to="/recoverPass">Forgot your password?</Link>
          ) : (
            ""
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default Login;
