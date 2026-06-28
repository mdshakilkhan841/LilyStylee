import { View, Dimensions, FlatList } from "react-native";
import ProductCard from "@/components/product/ProductCard";
import AddToBagButton from "@/components/product/AddToBagButton";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { useCallback } from "react";
import { useProducts } from "@/hooks/useProducts";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

const Products = () => {
    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useProducts();

    const products = data ? data.pages.flatMap((page) => page.products) : [];

    const handleLoadMore = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    if (isLoading || products.length === 0)
        return (
            <View style={styles.skeletonStyle}>
                {Array.from({ length: 6 }).map((_, idx) => (
                    <ProductCardSkeleton
                        key={idx}
                        width={width / itemNumber - 18}
                    />
                ))}
            </View>
        );

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <ProductCard
                    product={item}
                    width={width / itemNumber - 18}
                    AddToBagButton={AddToBagButton}
                />
            )}
            keyExtractor={(item, index) => `${index}_${item.id.toString()}`}
            numColumns={itemNumber}
            columnWrapperStyle={styles.columnWrapperStyle}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={6}
            windowSize={5}
            removeClippedSubviews={true}
            ListFooterComponent={
                isFetchingNextPage && products.length > 0 ? (
                    <View style={styles.skeletonStyle}>
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <ProductCardSkeleton
                                key={idx}
                                width={width / itemNumber - 18}
                            />
                        ))}
                    </View>
                ) : null
            }
        />
    );
};

export default Products;

const styles = {
    skeletonStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    columnWrapperStyle: {
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
};
