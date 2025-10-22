// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import authService from "../service/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.GetUser());
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logout = () => {
    authService.Logout();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const storedUser = authService.GetUser();
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
