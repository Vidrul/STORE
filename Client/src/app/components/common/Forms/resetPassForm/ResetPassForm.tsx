import { Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { resetPass } from "../../../../store/reducers/AuthSlice";
import { getAuthError } from "../../../../store/selectors/authSelector";
import { IResetPass } from "../../../../types/types";
import Form from "../Form";
import InputPass from "../react-form-hook-components/InputPass";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup.string().required("Please Enter your password"),
});

const ResetPassForm: FC = () => {
  const { token } = useParams();
  const error = useAppSelector(getAuthError());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<IResetPass>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const goTomMain = () => {
    navigate("/", { replace: true });
  };

  const onSubmit = (data: IResetPass) => {
    dispatch(resetPass({ ...data, token }, goTomMain));
  };

  return (
    <Paper>
      <Typography>Create new password</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputPass
          label={"Type new password"}
          control={control}
          name={"password"}
        />
        <InputPass
          label={"Confirm  password"}
          control={control}
          name={"confirmPassword"}
        />
        {error ? <p>{error}</p> : ""}
        <Button fullWidth variant="contained" type="submit">
          confirm
        </Button>
      </Form>
    </Paper>
  );
};

export default ResetPassForm;
