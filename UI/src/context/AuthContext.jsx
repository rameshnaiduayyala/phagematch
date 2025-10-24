import { createContext, useState, useEffect } from "react";
import authService from "../service/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage immediately
  const [user, setUser] = useState(() => authService.GetUser());
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const logout = () => {
    authService.Logout();
    setUser(null);
    setToken(null);
  };

  // Optional: keep in sync if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(authService.GetUser());
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, logout, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
