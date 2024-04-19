"use client";

import { useSignUp, useUser } from "@/stores/authQuery";
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
import { sign } from "crypto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const signUp = useSignUp();

  const onSubmit = (event: any) => {
    event.preventDefault();
    signUp.mutate({ fullName, email, password });
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
                  Full Name
                </Text>
                <TextField.Root
                  type="email"
                  placeholder="John Doe"
                  size={"1"}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </Flex>
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
                  <Button onClick={onSubmit}>Sign Up</Button>
                </Flex>
                <Button variant="outline">Use existing account</Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Container>
    </Flex>
  );
}
