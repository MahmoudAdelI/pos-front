import { fetchCategories } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

const useCategories = (currentBrand: string, token: string) => {
  return useQuery({
    queryKey: ["categories", currentBrand],
    queryFn: () => fetchCategories(currentBrand, token),
    enabled: !!currentBrand,
  });
};

export default useCategories;
