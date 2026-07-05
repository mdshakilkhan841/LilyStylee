import { View, FlatList, Dimensions } from "react-native";
import React, { useCallback } from "react";
import OfferProductCard from "@/components/product/card/product/offer_product_card";
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
            <OfferProductCard product={item} width={itemNumber ? 200 : 150} />
        ),
        [],
    );

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    if (isLoading && products.length === 0) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                    paddingHorizontal: 16,
                    paddingVertical: 4,
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
        );
    }

    return (
        <View style={{ paddingVertical: 4 }}>
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
                    gap: 10,
                    paddingHorizontal: 16,
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
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
