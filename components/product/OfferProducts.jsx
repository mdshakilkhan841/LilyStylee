import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "@/components/product/ProductCard";
import products from "@/assets/data/products.json";
import AddToBagButton from "@/components/product/AddToBagButton";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768;

const OfferProducts = () => {
    return (
        <View>
            <FlatList
                data={products?.products}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        width={itemNumber ? 200 : 150}
                        // AddToBagButton={AddToBagButton}
                    />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: itemNumber ? 20 : 12,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                }}
            />
        </View>
    );
};

export default OfferProducts;
