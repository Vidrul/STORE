import { FC } from "react";
import { Button as ButtonMui } from "@mui/material";

interface ButtonProps {
  text: string;
  variant: "text" | "outlined" | "contained" | undefined;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: FC<ButtonProps> = ({ text, onClick, variant }) => {
  return (
    <ButtonMui variant={variant} onClick={onClick}>
      {text}
    </ButtonMui>
  );
};

export default Button;
