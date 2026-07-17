import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/users/users.api";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    });
};
