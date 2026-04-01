/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInterceptor"; // 👈 import this

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const saveUserName = (first, last) => {
    const userData = { ...user, first, last };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
      setUser(null);
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

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, saveUserName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
