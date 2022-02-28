import { FC } from "react";
import ResetPassForm from "../../common/Forms/resetPassForm/ResetPassForm";
import styles from "./style.module.css";

const ResetPasswordPage: FC = () => {
  return (
    <div className={styles.container}>
      <ResetPassForm />
    </div>
  );
};

export default ResetPasswordPage;
