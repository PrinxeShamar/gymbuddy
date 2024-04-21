"use client";

import { Map } from "@/components/map";
import { useMapStore } from "@/stores/mapStore";
import {
  Avatar,
  Button,
  Card,
  DropdownMenu,
  Flex,
  ScrollArea,
  Separator,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { useRouter } from "next/navigation";

export default function Home() {
  const { locations, selectedLocation, setSelectedLocation } = useMapStore();
  const router = useRouter();

  return (
    <Flex flexGrow={"1"} direction={"row"} overflow={"hidden"}>
      <Flex direction={"column"} overflow={"hidden"}>
        {selectedLocation && (
          <>
            <Flex direction={"column"} p="6" gap={"4"}>
              <Text weight={"bold"} size={"4"}>
                Gym Details
              </Text>
              <Flex direction={"column"}>
                <Text weight={"bold"} color="gray" size={"1"}>
                  Name
                </Text>
                <Text weight={"bold"} size={"2"}>
                  {selectedLocation.name}
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <Text weight={"bold"} color="gray" size={"1"}>
                  Address
                </Text>
                <Text weight={"bold"} size={"2"}>
                  {selectedLocation.address}
                </Text>
              </Flex>
              <Button
                variant="outline"
                onClick={() => router.push(`/gyms/${selectedLocation.id}`)}
              >
                Join Gym
              </Button>
            </Flex>
            <Separator size={"4"} />
          </>
        )}
        <Flex
          flexGrow={"1"}
          overflow={"hidden"}
          direction={"column"}
          p="6"
          gap="4"
        >
          <Text weight={"bold"} size={"4"}>
            Locations
          </Text>
          <ScrollArea>
            <Flex flexGrow={"1"} direction={"column"} gap="2" mr={"4"}>
              {locations.map((location, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedLocation?.id === location.id ? "solid" : "outline"
                  }
                  onClick={() => setSelectedLocation(location)}
                >
                  {location.name}
                </Button>
              ))}
            </Flex>
          </ScrollArea>
        </Flex>
        <Separator size={"4"} />
      </Flex>
      <Flex>
        <Separator size={"4"} orientation={"vertical"} />
      </Flex>
      <Flex flexGrow={"1"} p="6">
        <Map />
      </Flex>
    </Flex>
  );
}
