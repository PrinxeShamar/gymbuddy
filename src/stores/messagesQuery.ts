import { getMessages, sendMessage } from "@/api/messages";
import createClient from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useMessages = (gymId: string) => {
  const queryClient = useQueryClient();
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(`messages`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'Message', filter: `gymId=eq.${gymId}`
      }, (payload) => {
        queryClient.setQueryData(["messages", gymId], (old: any[]) => [...old, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient, gymId])

  return useQuery({
    queryKey: ["messages", gymId],
    queryFn: async () => {
      return await getMessages(gymId);
    },
    staleTime: Infinity,
  });
}
export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
    onError: (error) => {
      console.log(`Error: ${error}`);
    },
  });
}