import { fetchUnits } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const useUnits = (token: string) => {
  return useQuery({
    queryKey: ["units"],
    queryFn: () => fetchUnits(token),
  });
};

export default useUnits;
