import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();

      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setAuth(decoded);
          } else {
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    auth,
    setAuth,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
