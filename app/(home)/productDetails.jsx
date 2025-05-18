import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const productDetails = () => {
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
                    title=""
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
                <Appbar.Action
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    icon="heart-outline"
                    onPress={() => {
                        router.push("wishlist");
                    }}
                />
                <TouchableRipple
                    borderless={true}
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    style={{
                        borderRadius: 50,
                        padding: 14,
                        marginRight: 8,
                    }}
                    onPress={() => {
                        router.push("(cart)");
                    }}
                >
                    <>
                        <Feather name="shopping-bag" size={20} color="black" />
                        <Badge
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                backgroundColor: "#db2777",
                            }}
                        >
                            30
                        </Badge>
                    </>
                </TouchableRipple>
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

export default productDetails;
