import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart";

const useCartStore = create((set, get) => ({
    cart: [],
    loadCart: async () => {
        try {
            const storedCart = await AsyncStorage.getItem(CART_KEY);
            if (storedCart) {
                set({ cart: JSON.parse(storedCart) });
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
        }
    },
    addToCart: async (product) => {
        try {
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
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart));
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    },
    removeFromCart: async (productId) => {
        try {
            const newCart = get().cart.filter((item) => item.id !== productId);
            set({ cart: newCart });
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart));
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    },
    updateQuantity: async (productId, quantity) => {
        try {
            const newCart = get().cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            );
            set({ cart: newCart });
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart));
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    },
    clearCart: async () => {
        try {
            set({ cart: [] });
            await AsyncStorage.removeItem(CART_KEY);
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    },
}));

// Load cart on startup
useCartStore.getState().loadCart();

export default useCartStore;
