import { View, Dimensions, FlatList } from "react-native";
import ProductCard from "@/components/product/ProductCard";
import AddToBagButton from "@/components/product/AddToBagButton";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { useEffect, useCallback } from "react";
import { useProductStore } from "@/store/useProductStore";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

const Products = () => {
    const { products, loading, initialLoading, skip, total, fetchProducts } =
        useProductStore();

    useEffect(() => {
        fetchProducts(0); // Only on first mount or refresh
    }, []);

    const handleLoadMore = useCallback(() => {
        if (!loading && products.length < total) {
            fetchProducts(skip);
        }
    }, [loading, products.length, total, fetchProducts, skip]);

    if (initialLoading || products.length === 0)
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
                loading && products.length > 0 ? (
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
