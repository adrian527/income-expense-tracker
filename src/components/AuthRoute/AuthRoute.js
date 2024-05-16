import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.users?.userAuth);
  const navigate = useNavigate();

  if (!userInfo?.token) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;
