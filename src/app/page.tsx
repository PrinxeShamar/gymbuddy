"use client";

import { Map } from "@/components/map";
import { useMapStore } from "@/stores/mapStore";
import {
  Button,
  Card,
  Flex,
  ScrollArea,
  Separator,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { locations, selectedLocation, setSelectedLocation } = useMapStore();

  return (
    <Flex flexGrow={"1"} direction={"column"}>
      <Flex p="4">
        <Text weight={"bold"} size={"4"}>
          GymBuddy
        </Text>
      </Flex>
      <Separator size="4" />
      <Flex flexGrow={"1"} direction={"row"}>
        <Flex minWidth={"20%"} direction={"column"}>
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
              </Flex>
              <Separator size={"4"} />
            </>
          )}
          <Flex direction={"column"} p="6" gap="4">
            <Text weight={"bold"} size={"4"}>
              Locations
            </Text>

            <Accordion.Root type="single" collapsible>
              <Flex direction={"column"} gap="2">
                {locations.map((location, idx) => (
                  <Button
                    variant={
                      selectedLocation?.id === location.id ? "solid" : "outline"
                    }
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location.name}
                  </Button>
                ))}
              </Flex>
            </Accordion.Root>
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
    </Flex>
  );
}
