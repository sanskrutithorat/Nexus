import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "@/features/projects/products.api";

export const useProducts = (
  limit: number,
  skip: number
) => {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => getProducts(limit, skip),
    placeholderData: keepPreviousData,
  });
};