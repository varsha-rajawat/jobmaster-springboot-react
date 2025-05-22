import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // needed for redirection
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem("token") || null,
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ user: null, token: null });
    navigate("/login");
  };

  // Optional: login helper to centralize logic
  const login = (user, token) => {
    localStorage.setItem("token", token);
    setAuth({ user, token });
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
