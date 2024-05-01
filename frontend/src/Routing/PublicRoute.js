import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const PublicRoute = () => {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    // Redirect based on the role
    const redirectPath = role === "admin" ? "/admin/home" : "/user/home";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
