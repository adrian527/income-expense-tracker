import React from "react";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.users?.userAuth);

  if (!userInfo?.token) {
    window.location.href = "/login";
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;
