import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "../../apis/apiEndpoints";

export interface GetTaskParams {
  search?: string;
  ordering?: string;
  page?: number;
  status?: string;
  project?: number;
  assigned_to?: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "completed";
  due_date: string;
  project: { id: number; name: string } | number | null;
  assigned_to: { id: number; username?: string; email?: string } | number | null;
  created_by: { id: number; email?: string } | number | null;
  organization?: { id: number; name: string } | number | null;
  created_at: string;
  updated_at: string;
}

export interface TaskResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
}

export const getAllTasks = async (
  params?: GetTaskParams
): Promise<TaskResponse> => {
  const response = await privateApi.get(API_ENDPOINTS.TASK.TASKS, { params });
  return response.data.data;
};

export const getTaskDetails = async (id: number): Promise<Task> => {
  const response = await privateApi.get(`${API_ENDPOINTS.TASK.TASKS}${id}/`);
  return response.data.data;
};

export const createTask = async (data: Partial<Task>): Promise<Task> => {
  const response = await privateApi.post(API_ENDPOINTS.TASK.TASKS, data);
  return response.data.data;
};

export const updateTask = async (
  id: number,
  data: Partial<Task>
): Promise<Task> => {
  const response = await privateApi.patch(
    `${API_ENDPOINTS.TASK.TASKS}${id}/`,
    data
  );
  return response.data.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await privateApi.delete(`${API_ENDPOINTS.TASK.TASKS}${id}/`);
};
