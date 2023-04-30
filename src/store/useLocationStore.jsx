import { create } from "zustand";
import { produce } from "immer";

export const useLocationStore = create((set) => ({
    position: { lat: 0, lng: 0 },
    setPosition: (pos) =>
        set(
            produce((state) => {
                state.position.lat = pos.lat;
                state.position.lng = pos.lng;
            })
        )
}))