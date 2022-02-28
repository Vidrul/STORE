import { Button } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { ILogin } from "../../../../types/types";
import Form from "../Form";
import Input from "../react-form-hook-components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../hooks/redux";
import { signUp } from "../../../../store/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";
import InputPass from "../react-form-hook-components/InputPass";

const schema = yup.object({
  name: yup
    .string()
    .required("Please Enter the name")
    .min(3, "Мinimum of three characters"),
  email: yup.string().email().required("Please Enter the email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<ILogin>({
    resolver: yupResolver(schema),
  });

  const nav = () => {
    navigate("/");
  };

  const onSubmit = (data: ILogin) => {
    dispatch(signUp(data, nav));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input name={"email"} label={"Email"} type={"text"} control={control} />
      <Input name={"name"} label={"Name"} type={"text"} control={control} />
      <InputPass name={"password"} label={"Password"} control={control} />
      <Button fullWidth type="submit" variant="contained">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
