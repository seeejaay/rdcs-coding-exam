import axiosInstance from "../lib/axios";

export const AuthAPI = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post("/v1/login", { email, password });
    // localStorage.setItem("auth_token", response.data.token);
    // console.log("Response:", response);
    return response;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },
};
