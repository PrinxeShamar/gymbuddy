import { getMessages, sendMessage } from "@/api/messages";
import createClient from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMessages = (gymId: string) => {
  const queryClient = useQueryClient();
  const supabase = createClient()

  supabase
    .channel(`messages`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Message' }, (payload) => {
      queryClient.setQueryData(["messages", gymId], (old: any[]) => [...old, payload.new]);
    })
    .subscribe()

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