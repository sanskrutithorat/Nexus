import { privateApi } from "@/apis/privateApi";
import { API_ENDPOINTS } from "../../apis/apiEndpoints";

export interface GetCustomersParams {
    search?: string;
    ordering?: string;
    page?: number;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    company_name: string;
    organization: number;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export interface CustomersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Customer[];
}

//Customer list get method

export const getallCustomer = async (
    params?: GetCustomersParams
): Promise<CustomersResponse> => {
    const response = await privateApi.get(
        API_ENDPOINTS.CUSTOMER.CUSTOMERS,
        { params }
    );

    return response.data.data;
};

export const getCustomerDetails = async (id: number): Promise<Customer> => {
    const response = await privateApi.get(
        `${API_ENDPOINTS.CUSTOMER.CUSTOMERS}${id}/`
    );
    return response.data.data;
};

export const createCustomer = async (data: Partial<Customer>): Promise<Customer> => {
    const response = await privateApi.post(
        API_ENDPOINTS.CUSTOMER.CUSTOMERS,
        data
    );
    return response.data.data;
};

export const updateCustomer = async (id: number, data: Partial<Customer>): Promise<Customer> => {
    const response = await privateApi.patch(
        `${API_ENDPOINTS.CUSTOMER.CUSTOMERS}${id}/`,
        data
    );
    return response.data.data;
};

export const deleteCustomer = async (id: number): Promise<void> => {
    await privateApi.delete(
        `${API_ENDPOINTS.CUSTOMER.CUSTOMERS}${id}/`
    );
};
