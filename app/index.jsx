import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-slate-400 justify-between">
            <Text>Hello, World!</Text>
        </SafeAreaView>
    );
}
