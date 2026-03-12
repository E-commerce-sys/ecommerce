/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = { role: "admin" }; // later from auth context

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
