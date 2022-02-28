import axios from "axios";
import { toast } from "react-toastify";
import authService from "./auth.service";
import localStorageService, { setTokens } from "./localStorage.service";
import config from "../config/default.json";

const http = axios.create({
  baseURL: config.baseURL,
});

http.interceptors.request.use(
  async (req) => {
    const expiresDate = localStorageService.getExpiredDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();
    const accessToken = localStorageService.getAccessToken();

    if (isExpired) {
      const content = await authService.refreshTokens();
      setTokens(content);
    }

    if (accessToken) {
      req.headers = { ...req.headers, Authorization: `Bearer ${accessToken}` };
    }

    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Unexpected Error");
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: http.get,
  post: http.post,
  patch: http.patch,
  delete: http.delete,
};

export default httpService;
