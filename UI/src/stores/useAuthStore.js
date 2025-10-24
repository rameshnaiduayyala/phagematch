// src/stores/useAuthStore.js
import { create } from "zustand";
import authService from "../service/authService";

export const useAuthStore = create((set) => ({
  user: authService.GetUser(),
  token: localStorage.getItem("token"),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    authService.Logout();
    set({ user: null, token: null });
  },
}));
