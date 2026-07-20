import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "../../apis/apiEndpoints";
import { publicApi } from "../../apis/publicApi";


export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;

  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    organization: string;
    role: string;
    is_active: boolean;
    address: string;
    contact_number: string;
  };
}



//login method

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await publicApi.post(
    API_ENDPOINTS.AUTH.LOGIN,
    {
      email: payload.email,
      password: payload.password,
    }
  );

  return response.data.data;
};


//refresh method

export const refreshTokenApi = async (
  refreshToken: string
) => {
  const response = await publicApi.post(
    API_ENDPOINTS.AUTH.REFRESH,
    {
      refresh: refreshToken,
    }
  );
  
  return response.data.data;
};

//current user method

export const getCurrentUser = async () => {
  const response = await privateApi.get(
    API_ENDPOINTS.AUTH.ME
  );

  return response.data.data;
};

//logout method

export const logoutApi = async (
  refreshToken: string
) => {
  const response = await privateApi.post(
    API_ENDPOINTS.AUTH.LOGOUT,
    {
      refresh: refreshToken,
    }
  );
  
  return response.data.data;
};