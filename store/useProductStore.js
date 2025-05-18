import { create } from "zustand";
import axios from "axios";

const LIMIT = 30;

export const useProductStore = create((set, get) => ({
    products: [],
    total: 0,
    loading: false,
    error: null,
    skip: 0,
    fetchProducts: async (skip = 0, limit = LIMIT) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(
                `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
            );
            set((state) => ({
                products:
                    skip === 0
                        ? res.data.products
                        : [...state.products, ...res.data.products],
                total: res.data.total,
                skip,
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));
