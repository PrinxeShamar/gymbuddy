"use client";

import { useGym } from "@/stores/gymQuery";
import { useMessages, useSendMessage } from "@/stores/messagesQuery";
import {
  Button,
  Card,
  Flex,
  ScrollArea,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export default function Page({
  params: { gymId },
}: {
  params: { gymId: string };
}) {
  const [message, setMessage] = useState("");
  const { data: gym } = useGym(gymId);
  const { data: messages } = useMessages(gymId);
  const sendMessage = useSendMessage();

  const onSendMessage = () => {
    setMessage("");
    sendMessage.mutate({
      gymId,
      content: message,
    });
  };

  if (gym) {
    return (
      <Flex flexGrow={"1"} direction={"row"}>
        <Flex width={"20%"} direction={"column"}>
          <Flex direction={"column"} p="6" gap={"4"}>
            <Text weight={"bold"} size={"4"}>
              Gym Details
            </Text>
            <Flex direction={"column"}>
              <Text weight={"bold"} color="gray" size={"1"}>
                Name
              </Text>
              <Text weight={"bold"} size={"2"}>
                {gym.name}
              </Text>
            </Flex>
            <Flex direction={"column"}>
              <Text weight={"bold"} color="gray" size={"1"}>
                Address
              </Text>
              <Text weight={"bold"} size={"2"}>
                {gym.address}
              </Text>
            </Flex>
          </Flex>
          <Separator size={"4"} />
        </Flex>
        <Separator size={"4"} orientation={"vertical"} />
        <Flex flexGrow={"1"} direction={"column"}>
          <Flex p="6" direction={"column"} gap="2">
            {messages?.map((message) => (
              <Card className="min-h-0">
                <Flex direction={"column"} gap="2">
                  <Text weight={"bold"} size={"1"}>
                    {message.userId}
                  </Text>
                  <Text size={"1"}>{message.content}</Text>
                </Flex>
              </Card>
            ))}
          </Flex>
          <Separator size={"4"} />
          <Flex direction={"row"} gap={"2"} p="6">
            <Flex direction={"column"} flexGrow={"1"}>
              <TextField.Root
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Flex>
            <Button color="blue" variant="outline" onClick={onSendMessage}>
              Send
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
