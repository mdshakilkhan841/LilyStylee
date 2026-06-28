import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

let storage;
let isMMKVAvailable = false;

try {
    const { createMMKV } = require("react-native-mmkv");
    storage = createMMKV();
    isMMKVAvailable = true;
} catch (e) {
    console.warn("MMKV could not be initialized. Falling back to AsyncStorage.", e);
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

const useWishListStore = create(
    persist(
        (set, get) => ({
            wishList: [],
            addToWishList: (item) =>
                set((state) => {
                    // Prevent duplicates by id
                    if (state.wishList.find((i) => i.id === item.id))
                        return state;
                    return { wishList: [...state.wishList, item] };
                }),
            removeFromWishList: (itemId) =>
                set((state) => ({
                    wishList: state.wishList.filter(
                        (item) => item.id !== itemId,
                    ),
                })),
            clearWishList: () => set({ wishList: [] }),
            isInWishList: (itemId) =>
                !!get().wishList.find((item) => item.id === itemId),
        }),
        {
            name: "wishlist", // key for local storage
            storage: createJSONStorage(() => customStorage),
        },
    ),
);

export default useWishListStore;
