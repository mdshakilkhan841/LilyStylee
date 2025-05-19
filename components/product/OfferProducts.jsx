import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import ProductCard from "@/components/product/ProductCard";
import AddToBagButton from "@/components/product/AddToBagButton";
import { useCategoryProductStore } from "../../store/useCategoryProductStore";
import { useEffect } from "react";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768;

const OfferProducts = () => {
    const { products, loading, skip, total, fetchProducts } =
        useCategoryProductStore();

    useEffect(() => {
        fetchProducts(0, 5, "smartphones");
    }, []);

    const handleLoadMore = () => {
        if (!loading && products.length < total) {
            fetchProducts(products.length);
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

    if (loading || products.length === 0)
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
                    loading && products.length > 0 ? (
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
