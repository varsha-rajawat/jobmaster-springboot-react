import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
