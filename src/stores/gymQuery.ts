import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGym } from "@/api/gym";
import { useEffect } from "react";

export const useGym = (id: string) => {
  return useQuery({
    queryKey: ["gym", id],
    queryFn: async () => {
      return await getGym(id);
    },
    staleTime: Infinity,
  });
};