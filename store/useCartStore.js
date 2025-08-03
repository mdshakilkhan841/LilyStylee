import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const storage = new MMKV();

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
        storage.delete(name);
    },
};

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product) => {
                const cart = get().cart;
                let newCart;
                const existing = cart.find((item) => item.id === product.id);
                if (existing) {
                    newCart = cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    newCart = [...cart, { ...product, quantity: 1 }];
                }
                set({ cart: newCart });
            },
            removeFromCart: (productIds) => {
                const newCart = get().cart.filter(
                    (item) => !productIds.includes(item.id)
                );
                set({ cart: newCart });
            },
            updateQuantity: (productId, quantity) => {
                const newCart = get().cart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                );
                set({ cart: newCart });
            },
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);

export default useCartStore;
