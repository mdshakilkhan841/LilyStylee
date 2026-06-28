import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "@/components/product/ProductCard";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768;

const OfferProducts = () => {
    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useCategoryProducts("smartphones", 5);

    const products = data ? data.pages.flatMap((page) => page.products) : [];

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    };

    const renderItem = ({ item }) => (
        <ProductCard
            key={item.id}
            product={item}
            width={itemNumber ? 200 : 150}
            // AddToBagButton={AddToBagButton}
        />
    );

    if (isLoading || products.length === 0)
        return (
            <View
                style={{
                    flexDirection: "row",
                    gap: itemNumber ? 20 : 12,
                    paddingHorizontal: 12,
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

    return (
        <View>
            <FlatList
                data={products}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: itemNumber ? 20 : 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
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
