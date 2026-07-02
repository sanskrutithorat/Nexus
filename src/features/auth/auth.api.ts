import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "../../apis/apiEndpoints";
import { publicApi } from "../../apis/publicApi";


export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;

  id: number;
  username: string;
  email: string;
  role: string;
}



//login method

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await publicApi.post(
    API_ENDPOINTS.AUTH.LOGIN,
    {
      username: payload.username,
      password: payload.password,
      expiresInMins: 30,
    }
  );

  return response.data;
};


//refresh method

export const refreshTokenApi = async (
  refreshToken: string
) => {
  const response = await publicApi.post(
    API_ENDPOINTS.AUTH.REFRESH,
    {
      refreshToken,
      expiresInMins: 30,
    }
  );
  
  return response.data;
};

//current user method

export const getCurrentUser = async () => {
  const response = await privateApi.get(
    API_ENDPOINTS.AUTH.ME
  );

  return response.data;
};