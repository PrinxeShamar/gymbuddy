"use client";

import Image from "next/image";
import {
  GoogleMap,
  InfoWindow,
  InfoWindowF,
  Libraries,
  LoadScript,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import { Location, useMapStore } from "@/stores/mapStore";

const libraries: Libraries = ["places"];

export function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: libraries,
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 42.7297667,
    lng: -73.6814633,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { locations, selectedLocation, setLocations, setSelectedLocation } =
    useMapStore();

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (map) {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: map.getCenter(),
        radius: 5000, // Search within 5000 meters of the center
        type: "gym", // Search for gyms
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const newLocations = results.map((place) => {
            return {
              id: place.place_id!,
              lat: place.geometry?.location?.lat()!,
              lng: place.geometry?.location?.lng()!,
              name: place.name,
              address: place.vicinity,
            };
          });
          setLocations(newLocations);
        }
      });
    }
  }, [map, setLocations]);

  if (isLoaded) {
    return (
      <div className="flex-1 relative">
        <div className="absolute left-0 right-0 top-0 bottom-0">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            center={center}
            zoom={15}
            onLoad={onLoad}
          >
            {locations.map((location, index) => (
              <MarkerF
                key={index}
                position={location}
                onClick={() => setSelectedLocation(location)}
              />
            ))}
            {selectedLocation && (
              <InfoWindowF
                position={{
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng,
                }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <Flex
                  direction={"column"}
                  p="6"
                  style={{ backgroundColor: "var(--color-background)" }}
                  gap={"2"}
                >
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
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>
      </div>
    );
  }
}
