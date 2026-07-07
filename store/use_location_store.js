import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

let storage;
let isMMKVAvailable = false;

try {
    const { createMMKV } = require("react-native-mmkv");
    storage = createMMKV();
    isMMKVAvailable = true;
} catch (e) {
    console.warn(
        "MMKV is not available in this environment (e.g. Expo Go). Falling back to AsyncStorage.",
    );
}

let AsyncStorage;
if (!isMMKVAvailable) {
    try {
        AsyncStorage =
            require("@react-native-async-storage/async-storage").default;
    } catch (e) {
        console.error("AsyncStorage fallback not available:", e);
    }
}

// Custom storage adapter that dynamically uses MMKV or AsyncStorage
const customStorage = {
    getItem: (name) => {
        if (isMMKVAvailable && storage) {
            const value = storage.getString(name);
            return value ?? null;
        } else if (AsyncStorage) {
            return AsyncStorage.getItem(name);
        }
        return null;
    },
    setItem: (name, value) => {
        if (isMMKVAvailable && storage) {
            storage.set(name, value);
        } else if (AsyncStorage) {
            return AsyncStorage.setItem(name, value);
        }
    },
    removeItem: (name) => {
        if (isMMKVAvailable && storage) {
            storage.remove(name);
        } else if (AsyncStorage) {
            return AsyncStorage.removeItem(name);
        }
    },
};

const useLocationStore = create(
    persist(
        (set, get) => ({
            selectedLocation: "Shakil Khan, 769008",
            setSelectedLocation: (location) =>
                set({ selectedLocation: location }),
            savedLocations: [
                {
                    id: "home",
                    title: "Home",
                    value: "Shakil Khan, 769008",
                    subtext: "769008, Shakil Khan - Dhaka, BD",
                    phone: "+880 1712-345678",
                    isDefault: true,
                    icon: "home-outline",
                },
                {
                    id: "office",
                    title: "Office",
                    value: "Shakil Office, 100012",
                    subtext: "100012, Shakil Office - Gulshan, BD",
                    phone: "+880 1912-876543",
                    isDefault: false,
                    icon: "office-building-marker-outline",
                },
            ],
            addLocation: (loc) => {
                const newLoc = {
                    id: String(Date.now()),
                    icon:
                        loc.title.toLowerCase() === "home"
                            ? "home-outline"
                            : loc.title.toLowerCase() === "office"
                              ? "office-building-marker-outline"
                              : "map-marker-outline",
                    ...loc,
                };
                let updatedLocations = get().savedLocations;
                if (loc.isDefault) {
                    updatedLocations = updatedLocations.map((l) => ({
                        ...l,
                        isDefault: false,
                    }));
                    set({ selectedLocation: loc.value });
                }
                set({ savedLocations: [...updatedLocations, newLoc] });
            },
            updateLocation: (id, updatedFields) => {
                let updated = get().savedLocations.map((loc) =>
                    loc.id === id
                        ? {
                              ...loc,
                              ...updatedFields,
                              icon:
                                  updatedFields.title?.toLowerCase() === "home"
                                      ? "home-outline"
                                      : updatedFields.title?.toLowerCase() ===
                                          "office"
                                        ? "office-building-marker-outline"
                                        : "map-marker-outline",
                          }
                        : loc,
                );

                if (updatedFields.isDefault) {
                    updated = updated.map((loc) => ({
                        ...loc,
                        isDefault: loc.id === id,
                    }));
                    set({ selectedLocation: updatedFields.value });
                }

                set({ savedLocations: updated });

                // Also update selectedLocation if it was the edited one and isDefault was not set (to keep name/pincode updates in sync)
                if (!updatedFields.isDefault) {
                    const currentSelected = get().selectedLocation;
                    const oldLoc = get().savedLocations.find(
                        (l) => l.id === id,
                    );
                    if (oldLoc && currentSelected === oldLoc.value) {
                        set({ selectedLocation: updatedFields.value });
                    }
                }
            },
        }),
        {
            name: "location",
            storage: createJSONStorage(() => customStorage),
        },
    ),
);

export default useLocationStore;
