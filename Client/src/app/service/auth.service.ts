import axios from "axios";
import { ILogin, IRecoverPass, IResetPass } from "../types/types";
import localStorageService from "./localStorage.service";

const PORT = process.env.PORT || 8080;

const httpAuth = axios.create({
  baseURL: `http://localhost:${PORT}/api/auth/`,
});

const authService = {
  singUp: async (payload: ILogin) => {
    const { data } = await httpAuth.post("singUp", payload);
    return data;
  },

  singIn: async (payload: ILogin) => {
    const { data } = await httpAuth.post("signInWithPassword", payload);
    return data;
  },

  forgotPassword: async (payload: IRecoverPass) => {
    const { data } = await httpAuth.post("forgotPassword", payload);
    return data;
  },

  resetPassword: async (payload: IResetPass) => {
    const { data } = await httpAuth.post("resetPassword", payload);
    return data;
  },

  refreshTokens: async () => {
    const { data } = await httpAuth.post("token", {
      refreshToken: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
