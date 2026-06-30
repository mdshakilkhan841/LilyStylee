import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import Lily from "@/assets/images/lily.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import useCartStore from "../../store/useCartStore";
import { Colors } from "../../constants/Colors";

const TopHeader = () => {
    const fullText = "Search for brands and products";
    const [displayedText, setDisplayedText] = useState("");
    const [typingIndex, setTypingIndex] = useState(0);
    const { cart } = useCartStore();

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prev) => fullText.slice(0, typingIndex));
            setTypingIndex((prev) => (prev < fullText.length ? prev + 1 : 0));
        }, 100); // Adjust typing speed here

        return () => clearInterval(interval);
    }, [typingIndex]);

    return (
        <View className="px-4">
            {/* Header */}
            <View className="flex flex-row items-center justify-between">
                <View>
                    <Lily width={130} height={30} />
                </View>
                <View className="flex flex-row items-center">
                    {/* ----- Cart ----- */}
                    <TouchableRipple
                        borderless={true}
                        rippleColor={Colors.ripple}
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {
                            router.push("/cart");
                        }}
                    >
                        <>
                            <MaterialCommunityIcons
                                name="shopping-outline"
                                size={22}
                                color="black"
                            />
                            {cart.length > 0 && (
                                <Badge
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        top: 8,
                                        right: 3,
                                        backgroundColor: Colors.primary,
                                        fontSize: 10,
                                    }}
                                >
                                    {cart.length}
                                </Badge>
                            )}
                        </>
                    </TouchableRipple>

                    {/* ----- User Profile ----- */}
                    <TouchableRipple
                        borderless={true}
                        rippleColor={Colors.ripple}
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {}}
                    >
                        <Feather name="user" size={22} color="black" />
                        {/* <SimpleLineIcons name="user" size={22} color="black" /> */}
                        {/* <SimpleLineIcons
                            name="user-female"
                            size={22}
                            color="black"
                        /> */}
                        {/* <MaterialDesignIcons
                            name="account-circle-outline"
                            color="black"
                            size={22}
                        /> */}
                    </TouchableRipple>
                </View>
            </View>

            {/* ------Delivery Location ---- */}
            <TouchableRipple
                borderless={true}
                rippleColor={Colors.ripple}
                onPress={() => {}}
                style={{
                    borderRadius: 4,
                    paddingVertical: 4,
                    alignSelf: "flex-start",
                }}
            >
                <View className="flex flex-row items-center gap-1">
                    <MaterialCommunityIcons
                        name="map-marker-radius-outline"
                        size={16}
                        color={Colors.primary}
                    />
                    <Text
                        numberOfLines={1}
                        className="text-xs text-gray-600"
                        style={{ fontSize: 11, maxWidth: 220 }}
                    >
                        Delever to{" "}
                        <Text className="font-semibold text-black">
                            Current location name Current location name Current
                            location name
                        </Text>
                    </Text>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={16}
                        color="black"
                    />
                </View>
            </TouchableRipple>

            {/* Search bar */}
            <TouchableRipple
                borderless={true}
                rippleColor={Colors.ripple}
                onPress={() => router.push("/searchProducts")}
                style={{
                    shadowColor: Colors.primary,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 100,
                    elevation: 400, // Android-specific shadow
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: Colors.primaryLight,
                    borderRadius: 8,
                    overflow: "hidden",
                    marginVertical: 8,
                }}
            >
                <View className="flex flex-row items-center justify-between px-5 h-11">
                    <View className="flex flex-row items-center gap-2 h-full">
                        <Ionicons
                            name="search-sharp"
                            size={20}
                            color="#9ca3af"
                        />
                        <Text className="text-sm text-gray-400">
                            {displayedText}
                        </Text>
                    </View>
                    <View className="flex flex-row items-center gap-1">
                        <TouchableRipple
                            borderless={true}
                            rippleColor={Colors.ripple}
                            style={{
                                borderRadius: 100,
                                padding: 8,
                            }}
                            onPress={() => {}}
                        >
                            <Feather name="camera" size={20} color="black" />
                        </TouchableRipple>
                        <TouchableRipple
                            borderless={true}
                            rippleColor={Colors.ripple}
                            style={{
                                borderRadius: 100,
                                padding: 8,
                            }}
                            onPress={() => {}}
                        >
                            <Feather name="mic" size={20} color="black" />
                        </TouchableRipple>
                    </View>
                </View>
            </TouchableRipple>
        </View>
    );
};

export default TopHeader;
