import { View, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function LilysChoice() {
    return (
        <View className="flex-1">
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    rippleColor={Colors.ripple}
                    onPress={() => {
                        router.back();
                    }}
                />
                <Appbar.Content
                    title="Lily's Choice"
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
            </Appbar.Header>
            {/* Body */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingBottom: 8,
                // }}
            ></ScrollView>
        </View>
    );
}
