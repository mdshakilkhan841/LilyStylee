import { View, FlatList, Dimensions } from "react-native";
import React, { useCallback } from "react";
import ProductCard from "@/components/product/card/product/product_card";
import { useCategoryProducts } from "@/hooks/use_category_products";
import ProductCardSkeleton from "@/components/skeleton/product_card_skeleton";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768;

const OfferProducts = () => {
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useCategoryProducts("smartphones", 5);

    const products = data ? data.pages.flatMap((page) => page.products) : [];

    const handleLoadMore = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    const renderItem = useCallback(
        ({ item }) => (
            <ProductCard product={item} width={itemNumber ? 200 : 150} />
        ),
        [],
    );

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    return (
        <View>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                windowSize={5}
                maxToRenderPerBatch={5}
                removeClippedSubviews={true}
                contentContainerStyle={{
                    gap: itemNumber ? 20 : 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={
                    isLoading ? (
                        <View
                            style={{
                                flexDirection: "row",
                                gap: itemNumber ? 20 : 12,
                            }}
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <ProductCardSkeleton
                                    key={index}
                                    width={itemNumber ? 200 : 150}
                                    cartButton={false}
                                />
                            ))}
                        </View>
                    ) : null
                }
                ListFooterComponent={
                    isFetchingNextPage && products.length > 0 ? (
                        <View style={{ flexDirection: "row", gap: 12 }}>
                            {Array.from({ length: 3 }, (_, index) => (
                                <ProductCardSkeleton
                                    key={index}
                                    width={itemNumber ? 200 : 150}
                                    cartButton={false}
                                />
                            ))}
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default OfferProducts;
