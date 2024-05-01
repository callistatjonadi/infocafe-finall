import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    // Clear user token and other data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    // Redirect to the login page
    navigate("/login");
  };

  return signOut;
};
