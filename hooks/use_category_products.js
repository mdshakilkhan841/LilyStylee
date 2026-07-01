import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

// API Fetcher for single category pagination
const fetchCategoryProductsApi = async ({ pageParam = 0, queryKey }) => {
    const [_key, category, limit] = queryKey;
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || "https://dummyjson.com";
    const res = await axios.get(
        `${baseUrl}/products/category/${category}?limit=${limit}&skip=${pageParam}`
    );
    return res.data;
};

/**
 * Hook for fetching products for a single category with pagination (infinite scroll).
 * Used in OfferProducts.jsx.
 */
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

/**
 * Hook for fetching products for multiple categories in parallel.
 * Used in category.jsx split-screen layout.
 */
export const useCategoryTabProducts = (activeCategoriesList) => {
    return useQueries({
        queries: activeCategoriesList.map((slug) => ({
            queryKey: ["categoryProductsList", slug],
            queryFn: async () => {
                const baseUrl =
                    process.env.EXPO_PUBLIC_API_URL || "https://dummyjson.com";
                const res = await axios.get(
                    `${baseUrl}/products/category/${slug}?limit=20`,
                );
                return { slug, products: res.data.products };
            },
            staleTime: 5 * 60 * 1000,
        })),
    });
};
