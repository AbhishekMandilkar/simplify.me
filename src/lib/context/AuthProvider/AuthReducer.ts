import type { IAuthProviderInitialState } from "./interfaces";
import { AuthContextAction } from "./interfaces";

export default (
  state: any,
  action: { type: AuthContextAction; payload: any }
): IAuthProviderInitialState => {
  const { type } = action;
  switch (type) {
    case AuthContextAction.LOGIN:
      return {
        ...state,
        userData: action.payload,
      };
    case AuthContextAction.LOGOUT:
      return {
        ...state,
        userData: {},
      };
    case AuthContextAction.GET_USER:
      return state.userData;
    default:
      return state;
  }
};
