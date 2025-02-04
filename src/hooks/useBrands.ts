import { fetchBrands } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

const useBrands = (token: string) => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(token),
  });
};

export default useBrands;
