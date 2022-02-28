import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import config from "../../config/default.json";
import localStorageService from "../../service/localStorage.service";

interface ProtectRouteProps {
  children: React.ReactElement;
}

const ProtectRoute: FC<ProtectRouteProps> = ({ children }) => {
  const adminId = config.adminId;

  if (adminId !== localStorageService.getUserId()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectRoute;
