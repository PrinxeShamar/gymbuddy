import {
  getUser,
  signIn as signInAction,
  signUp as signUpAction,
  signOut as signOutAction,
} from "@/api/auth";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log("useSignIn");
  }, []);

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

  useEffect(() => {
    console.log("useSignUp");
  }, []);

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
