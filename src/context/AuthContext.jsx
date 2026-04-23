import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axiosInstance from "../axios/axiosInterceptor";
import { getUserAPI } from "../features/account/API/userAPI";

const AuthContext = createContext();

const ADMIN_FLAGS_KEY = "auth_admin_flags";

function readStoredAdminFlags() {
  try {
    const raw = localStorage.getItem(ADMIN_FLAGS_KEY);
    if (!raw) return { isSuperAdmin: false, isAdmin: false };
    const parsed = JSON.parse(raw);
    return {
      isSuperAdmin: parsed.isSuperAdmin === true,
      isAdmin: parsed.isAdmin === true,
    };
  } catch {
    return { isSuperAdmin: false, isAdmin: false };
  }
}

/** True if API user.attributes grant access to /admin */
export function hasAdminPrivileges(attributes) {
  if (!attributes || typeof attributes !== "object") return false;
  return attributes.isSuperAdmin === true || attributes.isAdmin === true;
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(
    () => !!localStorage.getItem("token"),
  );
  const [adminFlags, setAdminFlags] = useState(readStoredAdminFlags);

  const persistAdminFlags = useCallback((attributes) => {
    const next = {
      isSuperAdmin: attributes?.isSuperAdmin === true,
      isAdmin: attributes?.isAdmin === true,
    };
    setAdminFlags(next);
    localStorage.setItem(ADMIN_FLAGS_KEY, JSON.stringify(next));
  }, []);

  const clearAdminFlags = useCallback(() => {
    const empty = { isSuperAdmin: false, isAdmin: false };
    setAdminFlags(empty);
    localStorage.removeItem(ADMIN_FLAGS_KEY);
  }, []);

  const hasAdminAccess = useMemo(
    () => hasAdminPrivileges(adminFlags),
    [adminFlags],
  );

  const login = useCallback(
    (token, attributes) => {
      localStorage.setItem("token", token);
      setLoggedIn(true);
      if (attributes != null) {
        persistAdminFlags(attributes);
      }
    },
    [persistAdminFlags],
  );

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      localStorage.removeItem("token");
      clearAdminFlags();
      setLoggedIn(false);
    }
  }, [clearAdminFlags]);

  /** Sync flags from GET /api/user (refresh, OTP login without attrs in body, etc.) */
  useEffect(() => {
    if (!loggedIn) return;

    let cancelled = false;

    (async () => {
      try {
        const user = await getUserAPI();
        if (cancelled || !user?.attributes) return;
        persistAdminFlags(user.attributes);
      } catch {
        /* keep existing flags / localStorage */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loggedIn, persistAdminFlags]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setLoggedIn(!!token);
      if (!token) clearAdminFlags();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [clearAdminFlags]);

  useEffect(() => {
    const onUnauthorized = () => {
      clearAdminFlags();
      setLoggedIn(false);
    };
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, [clearAdminFlags]);

  const value = useMemo(
    () => ({
      loggedIn,
      hasAdminAccess,
      adminFlags,
      login,
      logout,
    }),
    [loggedIn, hasAdminAccess, adminFlags, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
