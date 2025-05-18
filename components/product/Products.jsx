import { View, ActivityIndicator, Dimensions, FlatList } from "react-native";
import ProductCard from "@/components/product/ProductCard";
import AddToBagButton from "@/components/product/AddToBagButton";
import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

const Products = () => {
    const { products, loading, skip, total, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts(0);
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
            width={width / itemNumber - 18}
            AddToBagButton={AddToBagButton}
        />
    );

    if (loading && products.length === 0)
        return <ActivityIndicator size="large" />;

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString() + Math.random()}
            numColumns={itemNumber}
            columnWrapperStyle={{
                justifyContent: "space-between",
                paddingHorizontal: 12,
                paddingBottom: 12,
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loading && products.length > 0 ? (
                    <ActivityIndicator
                        color={"#db2777"}
                        size="small"
                        style={{ margin: 16 }}
                    />
                ) : null
            }
        />
    );
};

export default Products;
