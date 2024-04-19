"use client";

import { useSignOut, useUser } from "@/stores/authQuery";
import { Button, DropdownMenu, Flex, Separator, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  const signOut = useSignOut();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  if (user && !isLoading) {
    return (
      <Flex flexGrow={"1"} direction={"column"}>
        <Flex px="6" py="4" align={"center"}>
          <Flex flexGrow={"1"}>
            <Text weight={"bold"} size={"4"}>
              GymBuddy
            </Text>
          </Flex>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button>{user?.fullName}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item color="red" onClick={() => signOut.mutate()}>
                Sign Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <Separator size="4" />
        {children}
      </Flex>
    );
  }
}
