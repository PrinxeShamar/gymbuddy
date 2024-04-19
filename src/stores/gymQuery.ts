import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGym } from "@/api/gym";

export const useGym = (id: string) => {
  return useQuery({
    queryKey: ["gym"],
    queryFn: async () => {
      return await getGym(id);
    },
    staleTime: Infinity,
  });
};