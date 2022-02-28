import { Button } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { ILogin } from "../../../../types/types";
import Form from "../Form";
import Input from "../react-form-hook-components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../hooks/redux";
import { signIn } from "../../../../store/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";
import InputPass from "../react-form-hook-components/InputPass";

const schema = yup.object({
  email: yup.string().email().required("Please Enter the email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .min(8, "Must Contain 8 Characters"),
});

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<ILogin>({
    resolver: yupResolver(schema),
  });

  const nav = () => {
    navigate("/");
  };

  const onSubmit = (data: ILogin) => {
    dispatch(signIn(data, nav));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input name={"email"} label={"Email"} type={"text"} control={control} />
      <InputPass label={"Password"} control={control} name={"password"} />
      <Button fullWidth type="submit" variant="contained">
        LogIn
      </Button>
    </Form>
  );
};

export default LoginForm;
