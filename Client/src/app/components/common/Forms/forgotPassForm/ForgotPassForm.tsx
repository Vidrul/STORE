import { Box, Button, Paper } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form";
import Input from "../react-form-hook-components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  forgotPass,
  removePassRecoverMessage,
} from "../../../../store/reducers/AuthSlice";
import {
  getAuthError,
  getForgotPassMessage,
} from "../../../../store/selectors/authSelector";
import { Link } from "react-router-dom";

interface IForgotPassForm {
  email: string;
}

const schema = yup.object({
  email: yup.string().email().required("Please Enter the email"),
});

export const ForgotPassForm: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getAuthError());
  const message = useAppSelector(getForgotPassMessage());
  const { handleSubmit, control } = useForm<IForgotPassForm>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IForgotPassForm) => {
    dispatch(forgotPass(data));
  };

  const handleClick = () => {
    dispatch(removePassRecoverMessage());
  };

  return (
    <Paper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!message ? (
          <>
            <Input
              name={"email"}
              label={"Type your email"}
              type={"text"}
              control={control}
            />
            {error ? <p>{error}</p> : ""}
            <Button fullWidth variant="contained" type="submit">
              send
            </Button>
          </>
        ) : (
          <Box>
            <h2>{message}</h2>
            <Link onClick={handleClick} to="/">
              <h3>Go to main page</h3>
            </Link>
          </Box>
        )}
      </Form>
    </Paper>
  );
};
