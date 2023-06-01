/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner } from "@chakra-ui/react";
import type { Models } from "appwrite";
import React, { Suspense, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import RequireAuth from "lib/components/Auth/RequireAuth";
import { ACCOUNT_CONFIGURATION } from "lib/constants";
import { AuthContext } from "lib/context/AuthProvider/AuthenticationProvider";
import Page404 from "lib/pages/404";

import { routes, privateRoutes } from "./routes";

const Routings = () => {
  const { storeLoginUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    const userDataString = localStorage.getItem(ACCOUNT_CONFIGURATION.USER);
    if (userDataString?.length) {
      const userInfo = JSON.parse(userDataString) as Models.Session;
      if (userInfo?.$id) {
        storeLoginUserInfo(userInfo);
        navigate("/");
      }
    }
  }, []);
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {routes.map((routeProps) => (
          <Route {...routeProps} key={routeProps.path as string} />
        ))}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth
                key={`privateRoute-${privateRouteProps.path}`}
                redirectTo="/login"
              >
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};

export default Routings;
