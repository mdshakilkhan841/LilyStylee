import { useQueries } from "@tanstack/react-query";
import axios from "axios";

export const useCategoryProducts = (activeCategoriesList) => {
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
