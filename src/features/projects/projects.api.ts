import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "../../apis/apiEndpoints";

export interface GetProjectParams {
  search?: string;
  ordering?: string;
  page?: number;
  status?: string;
  customer?: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  budget: string,
  start_date: string;
  end_date: string;
  customer: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}


export interface ProjectResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
}

//Project list get method

export const getallProject = async (
  params?: GetProjectParams
): Promise<ProjectResponse> => {
  const response = await privateApi.get(
    API_ENDPOINTS.PROJECT.PROJECTS,
    { params }
  );

  return response.data.data;
};

export const getProjectDetails = async (id: number): Promise<Project> => {
  const response = await privateApi.get(
    `${API_ENDPOINTS.PROJECT.PROJECTS}${id}/`
  );
  return response.data.data;
};

export const createProject = async (data: Partial<Project>): Promise<Project> => {
  const response = await privateApi.post(
    API_ENDPOINTS.PROJECT.PROJECTS,
    data
  );
  return response.data.data;
};

export const updateProject = async (id: number, data: Partial<Project>): Promise<Project> => {
  const response = await privateApi.patch(
    `${API_ENDPOINTS.PROJECT.PROJECTS}${id}/`,
    data
  );
  return response.data.data;
};

// export const updateCustomer = async (id: number, data: Partial<Customer>): Promise<Customer> => {
//   const response = await privateApi.patch(
//     `${API_ENDPOINTS.CUSTOMER.CUSTOMERS}${id}/`,
//     data
//   );
//   return response.data.data;
// };

// export const deleteCustomer = async (id: number): Promise<void> => {
//   await privateApi.delete(
//     `${API_ENDPOINTS.CUSTOMER.CUSTOMERS}${id}/`
//   );
// };
