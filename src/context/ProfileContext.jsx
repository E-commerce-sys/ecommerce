// eslint-disable-next-line react/prop-types
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserAPI } from "../features/account/API/userAPI";

const UserContext = createContext({ user: null, loading: true, error: null });

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getUserAPI();
                setUser(userData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);
    
    return(
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}