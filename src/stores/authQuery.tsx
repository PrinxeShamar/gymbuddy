import {
  getUser,
  signIn as signInAction,
  signUp as signUpAction,
  signOut as signOutAction,
} from "@/api/auth";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
    staleTime: Infinity,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(`Error: ${error}`);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(`Error: ${error}`);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOutAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(`Error: ${error}`);
    },
  });
};
