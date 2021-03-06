import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import localStorageService from "../../service/localStorage.service";

interface ProtectRouteProps {
  children: React.ReactElement;
}

const ProtectRoute: FC<ProtectRouteProps> = ({ children }) => {
  if (!localStorageService.getUserId()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectRoute;
