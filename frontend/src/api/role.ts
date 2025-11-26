import axiosInstance from "../lib/axios";
import type { CreateRoleData, UpdateRoleData } from "../types/roles";

export const RoleAPI = {
  // Get all roles
  getRoles: async () => {
    const response = await axiosInstance.get("/v1/roles");
    return response.data;
  },

  // Get role by ID
  getRoleById: async (id: number) => {
    const response = await axiosInstance.get(`/v1/roles/${id}`);
    return response.data;
  },

  // Create new role
  createRole: async (data: CreateRoleData) => {
    const response = await axiosInstance.post("/v1/roles", data);
    return response.data;
  },

  // Update existing role
  updateRole: async (id: number, data: UpdateRoleData) => {
    const response = await axiosInstance.put(`/v1/roles/${id}`, data);
    return response.data;
  },

  // Delete role
  deleteRole: async (id: number) => {
    const response = await axiosInstance.delete(`/v1/roles/${id}`);
    return response.data;
  },
};
