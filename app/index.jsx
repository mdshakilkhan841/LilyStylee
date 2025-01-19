import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../components/home/TabBar";
import TopHeader from "../components/home/TopHeader";
import Categories from "../components/home/Categories";
import AdvertisementSlider from "../components/home/AdvertisementSlider";
import DiscountCard from "../components/home/DiscountCard";
import ProductCard from "../components/ProductCard";
import { View } from "react-native";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <TopHeader />
            {/* Body */}
            <ScrollView className="flex-1">
                <Categories />
                <AdvertisementSlider />
                <DiscountCard />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </ScrollView>
            </ScrollView>
            <TabBar />
        </SafeAreaView>
    );
}
