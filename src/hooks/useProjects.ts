import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {

    createProject,
    getallProject,
    getProjectDetails,
    updateProject,
    type GetProjectParams,
    type Project,
} from "@/features/projects/projects.api";

export const useGetProjects = (params?: GetProjectParams) => {
    return useQuery({
        queryKey: ["projects", params],
        queryFn: () => getallProject(params),
        placeholderData: keepPreviousData,
    });
};

export const useGetProjectDetails = (id: number) => {
    return useQuery({
        queryKey: ["projectDetails", id],
        queryFn: () => getProjectDetails(id),
        enabled: !!id,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Project>) => createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
            updateProject(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["projectDetails", variables.id] });
        },
    });
};

// export const useUpdateCustomer = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ id, data }: { id: number; data: Partial<Customer> }) =>
//             updateCustomer(id, data),
//         onSuccess: (_, variables) => {
//             queryClient.invalidateQueries({ queryKey: ["customers"] });
//             queryClient.invalidateQueries({ queryKey: ["customer", variables.id] });
//         },
//     });
// };

// export const useDeleteCustomer = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (id: number) => deleteCustomer(id),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["customers"] });
//         },
//     });
// };
