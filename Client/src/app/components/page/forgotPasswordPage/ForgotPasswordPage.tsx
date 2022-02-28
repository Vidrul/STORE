import { FC } from "react";
import { ForgotPassForm } from "../../common/Forms/forgotPassForm/ForgotPassForm";
import styles from "./style.module.css";

const ForgotPasswordPage: FC = () => {
  return (
    <div className={styles.container}>
      <ForgotPassForm />
    </div>
  );
};

export default ForgotPasswordPage;
