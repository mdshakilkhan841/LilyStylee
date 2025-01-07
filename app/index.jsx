import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../components/TabBar";
import TopHeader from "../components/TopHeader";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <TopHeader />
            <TabBar />
        </SafeAreaView>
    );
}
