"use client";

import { useSignIn } from "@/stores/authQuery";
import * as Form from "@radix-ui/react-form";
import {
  Button,
  Card,
  Container,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const router = useRouter();

  const onSubmit = (event: any) => {
    event.preventDefault();
    signIn.mutate({ email, password });
  };

  return (
    <Flex flexGrow={"1"} align={"center"}>
      <Container size="2">
        <Card style={{ padding: "0px" }}>
          <Flex direction={"column"}>
            <Flex direction={"column"} p="6">
              <Text weight={"bold"} size={"4"}>
                GymBuddy
              </Text>
            </Flex>
            <Separator size="4" />
            <Flex direction={"column"} p="6" gap="4">
              <Flex direction={"column"} gap="2">
                <Text weight={"bold"} color="gray" size={"2"}>
                  Email
                </Text>
                <TextField.Root
                  type="email"
                  placeholder="johndoe@email.com"
                  size={"1"}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Flex>
              <Flex direction={"column"} gap="2">
                <Text weight={"bold"} color="gray" size={"2"}>
                  Password
                </Text>
                <TextField.Root
                  type="password"
                  placeholder="**********"
                  size={"1"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Flex>
              <Flex direction={"row"} gap="2">
                <Flex flexGrow={"1"} direction={"column"}>
                  <Button onClick={onSubmit}>Sign In</Button>
                </Flex>
                <Button
                  variant="outline"
                  onClick={() => router.push("/signup")}
                >
                  Create an account
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Container>
    </Flex>
  );
}
