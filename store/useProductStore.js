import { create } from "zustand";
import axios from "axios";

const LIMIT = 20;

export const useProductStore = create((set, get) => ({
    products: [],
    total: 0,
    loading: false, // For pagination loading
    initialLoading: false, // For first load
    error: null,
    skip: 0,
    fetchProducts: async (skip = 0, limit = LIMIT) => {
        if (skip === 0) {
            set({ initialLoading: true, error: null });
        } else {
            set({ loading: true, error: null });
        }
        try {
            const res = await axios.get(
                `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
            );
            set((state) => {
                const newProducts =
                    skip === 0
                        ? res.data.products
                        : [...state.products, ...res.data.products];
                return {
                    products: newProducts,
                    total: res.data.total,
                    skip: newProducts.length,
                    loading: false,
                    initialLoading: false,
                };
            });
        } catch (error) {
            set({
                error: error.message,
                loading: false,
                initialLoading: false,
            });
        }
    },
}));
