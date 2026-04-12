import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Only users with isSuperAdmin or isAdmin (from auth / GET /api/user) may open /admin.
 */
function AdminRoute({ children }) {
  const { loggedIn, hasAdminAccess } = useAuth();
  const location = useLocation();

  if (!loggedIn) {
    return (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }

  if (!hasAdminAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
