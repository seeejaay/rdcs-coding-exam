import axios from "axios";

//Laravel URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
});

//Auto attaches tokens to the headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// This handles Unauthorize(401) responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response && response.status === 401) {
        const token = localStorage.getItem("auth_token");
        if (token && !window.location.pathname.includes("/login")) {
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Error in response interceptor:", error);
    }
    throw error;
  }
);

export default axiosInstance;
