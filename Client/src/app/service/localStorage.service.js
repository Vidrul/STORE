const USER_ID = "user_id";
const IS_EXPIRED = "is_expired";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export function setTokens({
  expiresIn = 3600,
  accessToken,
  refreshToken,
  userId,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(IS_EXPIRED, expiresDate);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

export function removeAuthData() {
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(IS_EXPIRED);
}

const localStorageService = {
  getUserId: () => {
    return localStorage.getItem(USER_ID);
  },
  getAccessToken: () => {
    return localStorage.getItem(ACCESS_TOKEN);
  },
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN);
  },
  getExpiredDate: () => {
    return localStorage.getItem(IS_EXPIRED);
  },
};

export default localStorageService;
