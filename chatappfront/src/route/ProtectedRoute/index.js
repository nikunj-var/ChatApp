import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authenticatedRoute = localStorage.getItem("authToken") !== null;

  console.log("authen", authenticatedRoute);

  if (!authenticatedRoute) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
