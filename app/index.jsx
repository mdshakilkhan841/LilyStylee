import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../components/home/TabBar";
import TopHeader from "../components/home/TopHeader";
import Categories from "../components/home/Categories";
import AdvertisementSlider from "../components/home/AdvertisementSlider";
import DiscountCard from "../components/home/DiscountCard";
import ProductCard from "../components/ProductCard";
import AddToBagButton from "../components/AddToBagButton";

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
                    <ProductCard width={175} AddToBagButton={AddToBagButton} />
                    <ProductCard width={175} />
                    <ProductCard width={175} AddToBagButton={AddToBagButton} />
                    <ProductCard width={175} />
                </ScrollView>
            </ScrollView>
            <TabBar />
        </SafeAreaView>
    );
}
