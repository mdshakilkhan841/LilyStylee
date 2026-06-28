import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategoryProductsApi = async ({ pageParam = 0, queryKey }) => {
    const [_key, category, limit] = queryKey;
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || "https://dummyjson.com";
    const res = await axios.get(
        `${baseUrl}/products/category/${category}?limit=${limit}&skip=${pageParam}`
    );
    return res.data;
};

export const useCategoryProducts = (category = "smartphones", limit = 5) => {
    return useInfiniteQuery({
        queryKey: ["categoryProducts", category, limit],
        queryFn: fetchCategoryProductsApi,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const currentCount = allPages.reduce((sum, page) => sum + page.products.length, 0);
            return currentCount < lastPage.total ? currentCount : undefined;
        },
    });
};
