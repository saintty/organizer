import { getToken } from "@utils/token";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isTokenExist = getToken();

  if (!isTokenExist) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
