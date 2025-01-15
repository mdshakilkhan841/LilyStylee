import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../components/home/TabBar";
import TopHeader from "../components/home/TopHeader";
import Categories from "../components/home/Categories";
import AdvertisementSlider from "../components/home/AdvertisementSlider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <TopHeader />
            {/* Body */}
            <ScrollView className="flex-1">
                <Categories />
                <AdvertisementSlider />
                <View className="flex-row items-center justify-center flex-1 m-4 border border-pink-600 border-dashed divide-x-2 divide-pink-600 divide-dashed">
                    <View className="items-center justify-center flex-1 w-1/2 p-1 border-r border-pink-600 border-dashed">
                        <Text className="text-xl font-bold text-blue-800">
                            EXTRA 10% OFF
                        </Text>
                        <Text className="text-sm">
                            Use Code :{" "}
                            <Text className="font-semibold">LILYSTYLEE</Text>
                        </Text>
                    </View>
                    <View className="items-center justify-center flex-1 w-1/2 p-1">
                        <Text className="text-sm font-bold text-center text-blue-800 ">
                            GET FREE SHOPPING ON ALL ORDERS{" "}
                            <FontAwesome6
                                name="bag-shopping"
                                size={18}
                                color="#1e40af"
                            />
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TabBar />
        </SafeAreaView>
    );
}
