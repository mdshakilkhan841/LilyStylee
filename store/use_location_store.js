import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

let storage;
let isMMKVAvailable = false;

try {
    const { createMMKV } = require("react-native-mmkv");
    storage = createMMKV();
    isMMKVAvailable = true;
} catch (e) {
    console.warn("MMKV is not available in this environment (e.g. Expo Go). Falling back to AsyncStorage.");
}

let AsyncStorage;
if (!isMMKVAvailable) {
    try {
        AsyncStorage = require("@react-native-async-storage/async-storage").default;
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
        (set) => ({
            selectedLocation: "Shakil Khan, 769008",
            setSelectedLocation: (location) => set({ selectedLocation: location }),
        }),
        {
            name: "location",
            storage: createJSONStorage(() => customStorage),
        },
    ),
);

export default useLocationStore;
