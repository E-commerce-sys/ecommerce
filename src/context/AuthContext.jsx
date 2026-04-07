/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInterceptor"; // 👈 import this

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });


  const login = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = async () => {
    try {
      // 🔥 Call backend logout
      await axiosInstance.post("/api/auth/logout");
    } catch (err) {
      // ❗ Don't block logout if API fails
      console.error("Logout API failed:", err);
    } finally {
      // ✅ Always clear local state
      localStorage.removeItem("token");
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const onUnauthorized = () => {
      setLoggedIn(false);
    };
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
