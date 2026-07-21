import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "@/apis/apiEndpoints";

export interface Role {
  id: string;
  name: string;
}

interface GetRolesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Role[];
}

export const getRoles = async (): Promise<Role[]> => {
  const response = await privateApi.get(API_ENDPOINTS.ROLE.ROLES);
  const data = response.data.data || response.data;
  return data.results || data;
};

export const createRole = async (data: Partial<Role>): Promise<Role> => {
  const response = await privateApi.post(API_ENDPOINTS.ROLE.ROLES, data);
  return response.data;
};

export const updateRole = async (id: string, data: Partial<Role>): Promise<Role> => {
  const response = await privateApi.patch(`${API_ENDPOINTS.ROLE.ROLES}${id}/`, data);
  return response.data;
};

export const deleteRole = async (id: string): Promise<void> => {
  await privateApi.delete(`${API_ENDPOINTS.ROLE.ROLES}${id}/`);
};
