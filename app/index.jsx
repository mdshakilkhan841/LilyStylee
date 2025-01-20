import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../components/home/TabBar";
import TopHeader from "../components/home/TopHeader";
import Categories from "../components/home/Categories";
import AdvertisementSlider from "../components/home/AdvertisementSlider";
import DiscountCard from "../components/home/DiscountCard";
import ProductCard from "../components/ProductCard";
import AddToBagButton from "../components/AddToBagButton";
import products from "@/assets/data/products.json";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <TopHeader />
            {/* Body */}
            <ScrollView className="flex-1">
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
            </ScrollView>
            <TabBar />
        </SafeAreaView>
    );
}
