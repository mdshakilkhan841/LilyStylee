import { create } from "zustand";
import axios from "axios";

export const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,
    error: null,
    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(
                "https://dummyjson.com/products/categories"
            );
            set({ categories: res.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));
