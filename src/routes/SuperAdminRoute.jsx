import { Navigate } from "react-router-dom";
import { useUser } from "../context/ProfileContext";

/** Only users with attributes.isSuperAdmin === true may access wrapped routes (e.g. Staff). */
function SuperAdminRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return null;
  }

  if (user?.attributes?.isSuperAdmin !== true) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default SuperAdminRoute;
