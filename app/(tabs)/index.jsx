import { View, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeader from "@/components/home/TopHeader";
import Categories from "@/components/home/Categories";
import AdvertisementSlider from "@/components/home/AdvertisementSlider";
import DiscountCard from "@/components/home/DiscountCard";
import OfferProducts from "@/components/product/OfferProducts";
import SpecialOfferSection from "@/components/home/SpecialOfferSection";
import ProductCard from "@/components/product/ProductCard";
import AddToBagButton from "@/components/product/AddToBagButton";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import React, { useCallback } from "react";
import { useProducts } from "@/hooks/useProducts";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

export default function Index() {
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useProducts();

    const products = data ? data.pages.flatMap((page) => page.products) : [];

    const handleLoadMore = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    const renderItem = useCallback(
        ({ item }) => (
            <ProductCard
                product={item}
                width={width / itemNumber - 18}
                AddToBagButton={AddToBagButton}
            />
        ),
        [],
    );

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Sticky Top Header */}
            <TopHeader />

            {/* Virtualized Main Products Scroll Grid */}
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={itemNumber}
                columnWrapperStyle={styles.columnWrapperStyle}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                windowSize={5}
                maxToRenderPerBatch={10}
                ListHeaderComponent={
                    <>
                        <Categories />
                        <AdvertisementSlider />
                        <DiscountCard />
                        <OfferProducts />
                        <SpecialOfferSection />
                    </>
                }
                ListEmptyComponent={
                    isLoading ? (
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
        </SafeAreaView>
    );
}

const styles = {
    columnWrapperStyle: {
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    skeletonStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
};
