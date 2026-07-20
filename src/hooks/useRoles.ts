import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getRoles, 
  createRole, 
  updateRole, 
  deleteRole, 
  type Role 
} from "@/features/roles/roles.api";

export const useGetRoles = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: () => getRoles(),
    });
};

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Role>) => createRole(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Role> }) => 
            updateRole(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });
};
