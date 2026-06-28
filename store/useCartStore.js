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
                            : item,
                    );
                } else {
                    newCart = [...cart, { ...product, quantity: 1 }];
                }
                set({ cart: newCart });
            },
            removeFromCart: (productIds) => {
                const newCart = get().cart.filter(
                    (item) => !productIds.includes(item.id),
                );
                set({ cart: newCart });
            },
            updateQuantity: (productId, quantity) => {
                const newCart = get().cart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item,
                );
                set({ cart: newCart });
            },
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => customStorage),
        },
    ),
);

export default useCartStore;
