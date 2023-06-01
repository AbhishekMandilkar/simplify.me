import { AuthContext } from "lib/context/AuthProvider/AuthenticationProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({
  children,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  // add your own authentication logic here
  const { userData } = useContext(AuthContext);
  const isAuthenticated = !!userData?.userId;

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
