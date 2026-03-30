

import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, role }) {
  const stored = localStorage.getItem("user");

  // Not logged in at all
  if (!stored) {
    alert("You must be logged in to access this page.");
    return <Navigate to="/auth/login" replace />;
  }

  const user = JSON.parse(stored);

  // Editor can access any protected page — skip role check
  if (user.role === "editor") {
    return children;
  }

  // Role doesn't match what this route requires
  if (user.role !== role) {
    alert("Access denied. You don't have permission to view this page.");
    // Send readers home, writers to their dashboard
    if (user.role === "reader") return <Navigate to="/" replace />;
    if (user.role === "writer") return <Navigate to="/writer/writerDash" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;