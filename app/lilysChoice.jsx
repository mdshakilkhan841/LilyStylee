import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";

const lilysChoice = () => {
    return (
        <SafeAreaView edges={["bottom"]} className="flex-1">
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    rippleColor="rgba(236, 72, 153, 0.15)"
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
        </SafeAreaView>
    );
};

export default lilysChoice;
