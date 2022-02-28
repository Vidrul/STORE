import { RootState } from "../store";

export function getAuthError() {
  return (state: RootState) => {
    return state.auth.error;
  };
}

export function getAuthorizedUserStatus() {
  return (state: RootState) => {
    return state.auth.isLoggedIn;
  };
}

export function getAuthorizedUserDataLoadStatus() {
  return (state: RootState) => {
    return state.auth.dataLoaded;
  };
}

export function getUserData() {
  return (state: RootState) => {
    return state.auth.user;
  };
}

export function getLoadingStatus() {
  return (state: RootState) => {
    return state.auth.isLoading;
  };
}

export function getForgotPassMessage() {
  return (state: RootState) => {
    return state.auth.passRecoverMessage?.message;
  };
}
