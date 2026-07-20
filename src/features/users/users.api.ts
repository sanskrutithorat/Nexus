import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "@/apis/apiEndpoints";

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  role_id?: number;
  password?: string;
  is_active?: boolean;
}

export interface GetUsersParams {
  username__icontains?: string;
  email__icontains?: string;
  role?: string;
  search?: string;
}

interface GetUsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export const getUsers = async (params?: GetUsersParams): Promise<GetUsersResponse> => {
  const response = await privateApi.get(API_ENDPOINTS.USER.USERS, { params });
  return response.data.data ? response.data.data : response.data;
};


export const createUser = async (data: Partial<User>): Promise<User> => {
  const response = await privateApi.post(API_ENDPOINTS.USER.USERS, data);
  return response.data;
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  const response = await privateApi.patch(`${API_ENDPOINTS.USER.USERS}${id}/`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await privateApi.delete(`${API_ENDPOINTS.USER.USERS}${id}/`);
};
