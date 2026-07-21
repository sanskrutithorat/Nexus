import { useQuery } from "@tanstack/react-query";
import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "@/apis/apiEndpoints";

export interface Organization {
  id: string;
  name: string;
  domain: string;
}

export const useGetOrganizations = () => {
    return useQuery({
        queryKey: ["organizations"],
        queryFn: async (): Promise<Organization[]> => {
            const response = await privateApi.get(API_ENDPOINTS.ORGANIZATION.ORGANIZATIONS);
            return response.data.data.results || response.data.data;
        },
    });
};
