import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { 
  getallCustomer, 
  getCustomerDetails,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  type GetCustomersParams,
  type Customer
} from "@/features/customer/customer.api";

export const useGetCustomers = (params?: GetCustomersParams) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getallCustomer(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetCustomerDetails = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerDetails(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Customer>) => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) => 
      updateCustomer(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", variables.id] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
