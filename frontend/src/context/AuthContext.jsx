import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const registerUser = async (formData) => {
    const res = await axiosInstance.post("/auth/register", formData);

    localStorage.setItem("travel-bud-token", res.data.token);
    setUser(res.data.user);

    return res.data;
  };

  const loginUser = async (formData) => {
    const res = await axiosInstance.post("/auth/login", formData);

    localStorage.setItem("travel-bud-token", res.data.token);
    setUser(res.data.user);

    return res.data;
  };

  const logoutUser = () => {
    localStorage.removeItem("travel-bud-token");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("travel-bud-token");

        if (!token) {
          setAuthLoading(false);
          return;
        }

        const res = await axiosInstance.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem("travel-bud-token");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadUser();
  }, []);

  const authInfo = {
    user,
    authLoading,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};