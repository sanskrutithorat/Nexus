

import { API_ENDPOINTS } from "@/apis/apiEndpoints";
import { publicApi } from "@/apis/publicApi";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }

export const getProducts = async (
  limit = 30,
  skip = 0
): Promise<ProductsResponse> => {
  const response = await publicApi.get(
    API_ENDPOINTS.PRODUCTS.GET_PRODUCTS,
    {
      params: {
        limit,
        skip,
      },
    }
  );

  return response.data;
};