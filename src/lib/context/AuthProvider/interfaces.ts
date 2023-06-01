import type { Models } from "appwrite";

export enum AuthContextAction {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  GET_USER = "GET_USER",
}

export interface IAuthProviderInitialState {
  userData: Models.Session;
  storeLoginUserInfo: (user: Models.Session) => void;
  removeLoginUserInfo: () => void;
}
