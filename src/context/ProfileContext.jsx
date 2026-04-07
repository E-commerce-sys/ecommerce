import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserAPI } from "../features/account/API/userAPI";
import { useAuth } from "./AuthContext";

const UserContext = createContext({ user: null, loading: true, error: null });

export function UserProvider({ children }) {
  const { loggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await getUserAPI();
      setUser(userData);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetchUser();
  }, [loggedIn]);

  return <UserContext.Provider value={{ user, setUser, loading, error }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}