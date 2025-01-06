import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../components/TabBar";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View>
                <Text>Hello World</Text>
            </View>
            <TabBar />
        </SafeAreaView>
    );
}
