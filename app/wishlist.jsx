import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const wishlist = () => {
    return (
        <SafeAreaView edges={["bottom"]} className="flex-1">
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    onPress={() => {
                        router.back();
                    }}
                />
                <Appbar.Content
                    title="WISHLIST"
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
                <TouchableRipple
                    borderless={true}
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    style={{
                        borderRadius: 100,
                        padding: 10,
                    }}
                    onPress={() => {}}
                >
                    <>
                        <SimpleLineIcons name="bag" size={22} color="black" />
                        <Badge
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 1.5,
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

export default wishlist;
