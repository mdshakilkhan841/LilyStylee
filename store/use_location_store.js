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
            selectedLocation: "",
            setSelectedLocation: (location) =>
                set({ selectedLocation: location }),
            savedLocations: [],
            addLocation: (loc) => {
                const newLoc = {
                    id: String(Date.now()),
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
            deleteLocation: (id) => {
                const locations = get().savedLocations;
                const locToDelete = locations.find((l) => l.id === id);
                const updated = locations.filter((l) => l.id !== id);
                set({ savedLocations: updated });

                if (locToDelete && get().selectedLocation === locToDelete.value) {
                    const newDefault = updated.find((l) => l.isDefault) || updated[0];
                    if (newDefault) {
                        set({ selectedLocation: newDefault.value });
                    } else {
                        set({ selectedLocation: "" });
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
