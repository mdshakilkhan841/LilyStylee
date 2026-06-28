import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const LIMIT = 20;

const fetchProductsApi = async ({ pageParam = 0 }) => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || "https://dummyjson.com";
    const res = await axios.get(
        `${baseUrl}/products?limit=${LIMIT}&skip=${pageParam}`
    );
    return res.data;
};

export const useProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: fetchProductsApi,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const currentCount = allPages.reduce((sum, page) => sum + page.products.length, 0);
            return currentCount < lastPage.total ? currentCount : undefined;
        },
    });
};
