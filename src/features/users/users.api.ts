import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "@/apis/apiEndpoints";

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  is_active?: boolean;
}

interface GetUsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export const getUsers = async (): Promise<GetUsersResponse> => {
  const response = await privateApi.get(API_ENDPOINTS.USER.USERS);
  return response.data;
};
