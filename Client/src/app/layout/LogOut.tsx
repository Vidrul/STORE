import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { logOut } from "../store/reducers/AuthSlice";

const LogOut: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const nav = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    dispatch(logOut(nav));
  }, []);
  return <div>LogOut</div>;
};

export default LogOut;
