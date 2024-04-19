import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Location {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  address?: string;
}

type State = {
  locations: Location[];
  selectedLocation: Location | null;
};

type Actions = {
  setSelectedLocation: (location: Location | null) => void;
  setLocations: (locations: Location[]) => void;
};

export const useMapStore = create<State & Actions>()(
  immer((set) => ({
    selectedLocation: null,
    locations: [],
    setSelectedLocation: (location: Location | null) =>
      set((state) => {
        state.selectedLocation = location;
      }),
    setLocations: (locations: Location[]) =>
      set((state) => {
        state.locations = locations;
      }),
  }))
);
