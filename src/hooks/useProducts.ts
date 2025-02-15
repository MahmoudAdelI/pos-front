import { fetchProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const useProducts = (token: string) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(token),
  });
};
export default useProducts;
