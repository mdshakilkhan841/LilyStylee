import { useMemo } from "react";

const groupIntoRows = (items, cols) => {
    const rows = [];
    for (let i = 0; i < items.length; i += cols) {
        rows.push(items.slice(i, i + cols));
    }
    return rows;
};

export const useProductSections = (
    activeCategoriesList,
    categories,
    categoryQueries,
    numColumns,
) => {
    const serializedQueries = useMemo(
        () =>
            JSON.stringify(
                categoryQueries.map((q) => ({
                    slug: q.data?.slug,
                    length: q.data?.products?.length || 0,
                    isLoading: q.isLoading,
                })),
            ),
        [categoryQueries],
    );

    const sections = useMemo(() => {
        if (categories.length === 0) {
            return [
                {
                    title: "Loading",
                    slug: "loading",
                    data: [
                        { isSkeletonPlaceholder: true },
                        { isSkeletonPlaceholder: true },
                        { isSkeletonPlaceholder: true },
                        { isSkeletonPlaceholder: true },
                    ],
                },
            ];
        }

        return activeCategoriesList.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            const query = categoryQueries.find((q) => q.data?.slug === slug);
            const isLoading = query ? query.isLoading : true;
            const prods = query?.data?.products || [];
            const rows = isLoading
                ? [{ isSkeletonPlaceholder: true }]
                : groupIntoRows(prods, numColumns);

            return {
                title: cat?.name || slug,
                slug: slug,
                data: rows,
            };
        });
    }, [activeCategoriesList, categories, numColumns, serializedQueries]);

    const isAnyProductsLoading =
        categories.length === 0 || categoryQueries.some((q) => q.isLoading);

    return { sections, isAnyProductsLoading };
};
