import { View, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopHeader from "@/components/home/top_header";
import Categories from "@/components/home/categories";
import AdvertisementSlider from "@/components/home/advertisement_slider";
import DiscountCard from "@/components/home/discount_card";
import OfferProducts from "@/components/product/offer_products";
import SpecialOfferSection from "@/components/home/special_offer_section";
import ProductCard from "@/components/product/product_card";
import ProductCardSkeleton from "@/components/skeleton/product_card_skeleton";
import React, { useCallback, useMemo } from "react";
import { Colors } from "@/constants/colors";
import { useProducts } from "@/hooks/use_products";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

const HomeHeader = React.memo(() => {
    return (
        <>
            <Categories />
            <AdvertisementSlider />
            <DiscountCard />
            <OfferProducts />
            <SpecialOfferSection />
        </>
    );
});

HomeHeader.displayName = "HomeHeader";

export default function Index() {
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useProducts();

    const products = useMemo(() => {
        return data ? data.pages.flatMap((page) => page.products) : [];
    }, [data]);

    const handleLoadMore = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    const renderItem = useCallback(
        ({ item }) => (
            <ProductCard product={item} width={width / itemNumber - 18} />
        ),
        [],
    );

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    const renderHeader = useCallback(() => <HomeHeader />, []);

    return (
        <SafeAreaView
            edges={[]}
            className="flex-1"
            style={{ backgroundColor: Colors.bgPrimary }}
        >
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
                initialNumToRender={8}
                windowSize={7}
                maxToRenderPerBatch={6}
                updateCellsBatchingPeriod={50}
                removeClippedSubviews={true}
                ListHeaderComponent={renderHeader}
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
