import LoginScreen from "lib/pages/login/Login";
import React from "react";
import type { PathRouteProps } from "react-router-dom";

const Home = React.lazy(() => import("lib/pages/home"));

export const routes: Array<PathRouteProps> = [
  {
    path: "/login",
    element: <LoginScreen />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
];
