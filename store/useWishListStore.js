import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

let storage;
try {
    storage = createMMKV();
} catch (e) {
    console.error("MMKV could not be initialized. Native modules might be missing.", e);
    // Mock storage for non-native environments
    storage = {
        getString: () => null,
        set: () => {},
        remove: () => {},
    };
}

// MMKV adapter for Zustand
const zustandStorage = {
    getItem: (name) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    setItem: (name, value) => {
        storage.set(name, value);
    },
    removeItem: (name) => {
        storage.remove(name);
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
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);

export default useWishListStore;
