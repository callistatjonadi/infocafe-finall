import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth"; // Import the useAuth hook

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  return isAuthenticated && allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
