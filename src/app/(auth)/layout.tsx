"use client";

import { useUser } from "@/stores/authQuery";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading]);

  if (!user && !isLoading) {
    return <>{children}</>;
  }
}
