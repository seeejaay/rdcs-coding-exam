import axiosInstance from "../lib/axios";
import type { User, CreateUserData, UpdateUserData } from "../types/users";

export const UserAPI = {
  // Get current logged-in user profile (returns single user)
  getProfile: async () => {
    const response = await axiosInstance.get<User>("/v1/profile");
    console.log("UserAPI.getProfile response:", response);
    return response;
  },

  // Get all users (returns array)
  getUsers: async () => {
    const response = await axiosInstance.get("/v1/users");
    console.log("UserAPI.getUsers response:", response);
    return response.data;
  },

  getUserById: async (userId: number) => {
    const response = await axiosInstance.get<User>(`/v1/users/${userId}`);
    console.log("UserAPI.getUserById response:", response);
    return response.data;
  },

  createUser: async (userData: CreateUserData) => {
    const response = await axiosInstance.post("/v1/users", userData);
    return response.data;
  },

  updateUser: async (userId: number, userData: UpdateUserData) => {
    const response = await axiosInstance.put(`/v1/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: number) => {
    const response = await axiosInstance.delete(`/v1/users/${userId}`);
    console.log("UserAPI.deleteUser response:", response);
    return response.data;
  },
};
