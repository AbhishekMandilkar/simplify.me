// import { useContext } from "react";

import { useContext } from "react";

import { AuthContext } from "lib/context/AuthProvider/AuthenticationProvider";

export const getUserData = () => {
  const authProvider = useContext(AuthContext);
  return authProvider.getUserData();
};
