import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem("token") || null,
  });

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setAuth({ user, token });
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ user: null, token: null });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
