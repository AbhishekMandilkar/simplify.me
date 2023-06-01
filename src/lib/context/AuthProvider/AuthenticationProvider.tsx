import type { Models } from "appwrite";
import type { ReactNode } from "react";
import React from "react";

import { ACCOUNT_CONFIGURATION } from "lib/constants";

import AuthReducer from "./AuthReducer";
import type { IAuthProviderInitialState } from "./interfaces";
import { AuthContextAction } from "./interfaces";
// Initial State
const initialState: IAuthProviderInitialState = {
  userData: {} as Models.Session,
  storeLoginUserInfo: () => null,
  removeLoginUserInfo: () => null,
};

// Create Context
export const AuthContext = React.createContext(initialState);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  // Actions
  const storeLoginUserInfo = (user: Models.Session) => {
    localStorage.setItem(ACCOUNT_CONFIGURATION.USER, JSON.stringify(user));
    dispatch({
      type: AuthContextAction.LOGIN,
      payload: user,
    });
  };

  const removeLoginUserInfo = () => {
    localStorage.removeItem(ACCOUNT_CONFIGURATION.USER);
    dispatch({
      type: AuthContextAction.LOGOUT,
      payload: {},
    });
  };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        userData: state.userData,
        storeLoginUserInfo,
        removeLoginUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
