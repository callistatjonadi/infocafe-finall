import { jwtDecode } from 'jwt-decode';  

export const useAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { isAuthenticated: false, role: null };
  }

  try {
    const decoded = jwtDecode(token);  
    return { isAuthenticated: true, role: decoded.role };
  } catch (error) {
    console.log("Token decoding failed:", error);
    return { isAuthenticated: false, role: null };
  }
};
