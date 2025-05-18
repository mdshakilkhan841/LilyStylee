import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "@/components/home/TabBar";
import TopHeader from "@/components/home/TopHeader";
import Categories from "@/components/home/Categories";
import AdvertisementSlider from "@/components/home/AdvertisementSlider";
import DiscountCard from "@/components/home/DiscountCard";
import SpecialOfferSection from "@/components/home/SpecialOfferSection";
import OfferProducts from "@/components/product/OfferProducts";
import Products from "@/components/product/Products";

export default function Index() {
    return (
        <SafeAreaView className="flex-1">
            {/* Top Header */}
            <TopHeader />

            {/* Body Content */}
            <FlatList
                showsVerticalScrollIndicator={false}
                // renderItem={{}}
                ListHeaderComponent={
                    // Body content
                    <>
                        <Categories />
                        <AdvertisementSlider />
                        <DiscountCard />
                        <OfferProducts />
                        <SpecialOfferSection />
                        <Products />
                    </>
                }
            />

            {/* Tab Bar */}
            <TabBar />
        </SafeAreaView>
    );
}
