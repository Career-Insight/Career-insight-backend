import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from './../../context/authentication';

export default function Protactedroute({ children }) {
  const { token } = useContext(authContext);
  if (token === null) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
