import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const rawUser = localStorage.getItem("user");

  // Not logged in
  if (!rawUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(rawUser);

  // Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}