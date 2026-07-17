import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
    createTask,
    getAllTasks,
    getTaskDetails,
    updateTask,
    deleteTask,
    type GetTaskParams,
    type Task,
} from "@/features/task/task.api";

export const useGetTasks = (params?: GetTaskParams) => {
    return useQuery({
        queryKey: ["tasks", params],
        queryFn: () => getAllTasks(params),
        placeholderData: keepPreviousData,
    });
};

export const useGetTaskDetails = (id: number) => {
    return useQuery({
        queryKey: ["taskDetails", id],
        queryFn: () => getTaskDetails(id),
        enabled: !!id,
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Task>) => createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) =>
            updateTask(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["taskDetails", variables.id] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
