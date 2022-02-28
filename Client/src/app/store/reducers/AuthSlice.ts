import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../service/auth.service";
import { setTokens } from "../../service/localStorage.service";
import localStorageService, {
  removeAuthData,
} from "../../service/localStorage.service";
import { ILogin, IRecoverPass, IResetPass } from "../../types/types";
import { generateAtuhError } from "../../utils/helper/generateAuthError";
import { AppDispatch } from "../store";
import userService from "../../service/user.service";

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
}

interface IMessage {
  message: string;
}

interface IAuth {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  auth: {} | null;
  passRecoverMessage: IMessage | null;
  isLoggedIn: boolean;
  dataLoaded: boolean;
}

const initialState: IAuth = localStorageService.getAccessToken()
  ? {
      user: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      passRecoverMessage: null,
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      user: null,
      isLoading: false,
      error: null,
      auth: null,
      passRecoverMessage: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequested: (state) => {
      state.error = null;
    },

    removedAuthError: (state) => {
      state.error = null;
    },
    authRequestSuccessed: (state, action: PayloadAction<{}>) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },

    authRequestFailde: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    userRequested: (state) => {
      state.isLoading = true;
    },

    userReceived: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },

    userRequestedFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    userLoggedOut: (state) => {
      state.auth = null;
      state.user = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },

    passRecoverySuccessed: (state, action: PayloadAction<IMessage>) => {
      state.passRecoverMessage = action.payload;
      state.error = null;
    },

    passRecoverMessageRemoved: (state) => {
      state.passRecoverMessage = null;
    },
  },
});

const { actions, reducer: AuthReducer } = authSlice;

const {
  authRequested,
  authRequestSuccessed,
  authRequestFailde,
  removedAuthError,
  userRequested,
  userReceived,
  userRequestedFailed,
  userLoggedOut,
  passRecoverySuccessed,
  passRecoverMessageRemoved,
} = actions;

export function resetPass(payload: IResetPass, nav: () => void) {
  return async (dispatch: AppDispatch) => {
    try {
      const content = await authService.resetPassword(payload);
      dispatch(passRecoverySuccessed(content));
      nav();
    } catch (e: any) {
      const { code, message } = e.response.data;
      if (code === 400) {
        const authError = generateAtuhError(message);
        dispatch(authRequestFailde(authError || ""));
      } else {
        dispatch(authRequestFailde(e.message));
      }
    }
  };
}

export function forgotPass(payload: IRecoverPass) {
  return async (dispatch: AppDispatch) => {
    try {
      const content = await authService.forgotPassword(payload);
      console.log(content);

      dispatch(passRecoverySuccessed(content));
    } catch (e: any) {
      const { code, message } = e.response.data;
      console.log(code);

      if (code === 400) {
        const authError = generateAtuhError(message);
        console.log(authError);

        dispatch(authRequestFailde(authError || ""));
      } else {
        dispatch(authRequestFailde(e.message));
      }
    }
  };
}

export function logOut(nav: () => void) {
  return (dispatch: AppDispatch) => {
    removeAuthData();
    dispatch(userLoggedOut());
    nav();
  };
}

export function removeAuthError() {
  return (dispatch: AppDispatch) => {
    dispatch(removedAuthError());
  };
}
export function removePassRecoverMessage() {
  return (dispatch: AppDispatch) => {
    dispatch(passRecoverMessageRemoved());
  };
}

export function signUp(payload: ILogin, nav: () => void) {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    try {
      const content = await authService.singUp(payload);
      setTokens(content);
      dispatch(authRequestSuccessed({ userId: content.userId }));
      nav();
    } catch (error: any) {
      const { code, message } = error.response.data;
      if (code === 400) {
        const authError = generateAtuhError(message);
        dispatch(authRequestFailde(authError || ""));
      } else {
        dispatch(authRequestFailde(error.message));
      }
    }
  };
}
export function signIn(payload: ILogin, nav: () => void) {
  return async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    try {
      const content = await authService.singIn(payload);
      setTokens(content);
      dispatch(authRequestSuccessed({ userId: content.userId }));
      nav();
    } catch (error: any) {
      const { code, message } = error.response.data;
      if (code === 400) {
        const authError = generateAtuhError(message);
        dispatch(authRequestFailde(authError || ""));
      } else {
        dispatch(authRequestFailde(error.message));
      }
    }
  };
}

export function loadAuthorizedUserData() {
  return async (dispatch: AppDispatch) => {
    dispatch(userRequested());
    try {
      const { content } = await userService.getUser(
        localStorageService.getUserId() || ""
      );
      setTimeout(() => {
        dispatch(userReceived({ ...content[0] }));
      }, 1500);
    } catch (error: any) {
      dispatch(userRequestedFailed(error.message));
    }
  };
}

export default AuthReducer;
