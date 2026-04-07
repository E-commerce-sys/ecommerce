import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserAPI } from "../features/account/API/userAPI";
import { useAuth } from "./AuthContext"; // 👈 import this

const UserContext = createContext({ user: null, loading: true, error: null });

export function UserProvider({ children }) {
  const { loggedIn } = useAuth(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchUser() {
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
  }

  // 🔥 THIS IS THE KEY
  useEffect(() => {
    if (!loggedIn) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetchUser();
  }, [loggedIn]); // 👈 dependency added

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}