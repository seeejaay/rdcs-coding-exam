import { AuthAPI } from "../api/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./useStateContext";
export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useStateContext();

  const login = useCallback(async (email: string, password: string) => {
    const response = await AuthAPI.login(email, password);
    return response;
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthAPI.logout();

      setUser(null);
      setToken(null);

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      setUser(null);
      setToken(null);
      navigate("/login");
    }
  }, [navigate, setUser, setToken]);
  return { login, logout };
};
