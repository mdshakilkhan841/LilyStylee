import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                        (item) => item.id !== itemId
                    ),
                })),
            clearWishList: () => set({ wishList: [] }),
            isInWishList: (itemId) =>
                !!get().wishList.find((item) => item.id === itemId),
        }),
        {
            name: "wishlist", // key for local storage
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useWishListStore;
