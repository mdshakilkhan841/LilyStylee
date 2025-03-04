import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../components/home/TabBar";
import TopHeader from "../components/home/TopHeader";
import Categories from "../components/home/Categories";
import AdvertisementSlider from "../components/home/AdvertisementSlider";
import DiscountCard from "../components/home/DiscountCard";
import ProductCard from "../components/ProductCard";
import AddToBagButton from "../components/AddToBagButton";
import products from "@/assets/data/products.json";
import SpecialOfferSection from "../components/home/SpecialOfferSection";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
const width = Dimensions.get("window").width;

const OfferProducts = ({ products }) => {
    return (
        // <FlatList
        //     data={products?.products}
        //     renderItem={({ item }) => (
        //         <ProductCard
        //             product={item}
        //             width={width / 2 - 18}
        //             AddToBagButton={AddToBagButton}
        //         />
        //     )}
        //     // horizontal={true}
        //     showsHorizontalScrollIndicator={false}
        //     contentContainerStyle={{
        //         // gap: 12,
        //         paddingHorizontal: 12,
        //         paddingVertical: 4,
        //         flexDirection: "row",
        //         flexWrap: "wrap",
        //         justifyContent: "space-between",
        //         alignContent: "center",
        //         alignItems: "center",
        //     }}
        // />
        <View
            style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
            }}
        >
            {products?.products.map((item, index) => (
                <ProductCard
                    key={index}
                    product={item}
                    width={width / 2 - 18}
                    AddToBagButton={AddToBagButton}
                />
            ))}
        </View>
    );
};

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <TopHeader />
            {/* Body */}
            <ScrollView
                className="mb-[60px]"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 8 }}
            >
                <Categories />
                <AdvertisementSlider />
                <DiscountCard />
                {/* Offer Products */}
                <FlatList
                    data={products?.products}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            width={145}
                            // AddToBagButton={AddToBagButton}
                        />
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                    }}
                />
                {/* Special Offers */}
                <SpecialOfferSection />
                {/* <FlatList
                    data={products?.products}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            width={width / 2 - 18}
                            AddToBagButton={AddToBagButton}
                        />
                    )}
                    // horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        // gap: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                /> */}
                <OfferProducts products={products} />
            </ScrollView>
            <TabBar />
        </SafeAreaView>
    );
}
