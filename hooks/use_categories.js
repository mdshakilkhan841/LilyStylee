import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategoriesApi = async () => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || "https://dummyjson.com";
    const res = await axios.get(`${baseUrl}/products/categories`);
    return res.data;
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategoriesApi,
    });
};
