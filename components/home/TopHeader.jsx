import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Lily from "@/assets/images/lily.svg";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";

const TopHeader = () => {
    const fullText = "Search for brands and products";
    const [displayedText, setDisplayedText] = useState("");
    const [typingIndex, setTypingIndex] = useState(0);

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
                    <TouchableRipple
                        borderless={true}
                        rippleColor="rgba(236, 72, 153, 0.15)"
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {}}
                    >
                        <>
                            <SimpleLineIcons
                                name="bell"
                                size={22}
                                color="black"
                            />
                            <Badge
                                style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    backgroundColor: "#db2777",
                                }}
                            >
                                3
                            </Badge>
                        </>
                    </TouchableRipple>
                    <TouchableRipple
                        borderless={true}
                        rippleColor="rgba(236, 72, 153, 0.15)"
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {
                            router.navigate("(cart)");
                        }}
                    >
                        <>
                            <SimpleLineIcons
                                name="bag"
                                size={22}
                                color="black"
                            />
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
                    <TouchableRipple
                        borderless={true}
                        rippleColor="rgba(236, 72, 153, 0.15)"
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {}}
                    >
                        {/* <Feather name="user" size={23} color="black" /> */}
                        <SimpleLineIcons name="user" size={22} color="black" />
                        {/* <SimpleLineIcons
                            name="user-female"
                            size={22}
                            color="black"
                        /> */}
                    </TouchableRipple>
                </View>
            </View>

            {/* Search bar */}
            <View
                className="flex flex-row items-center justify-between px-5 my-2 bg-white border border-pink-400 rounded-lg h-11"
                style={{
                    shadowColor: "#db2777",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 100,
                    elevation: 400, // Android-specific shadow
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.6}
                    className="flex flex-row items-center w-4/6 h-full gap-2"
                >
                    <Ionicons name="search-sharp" size={20} color="#9ca3af" />
                    <Text className="text-sm text-gray-400">
                        {displayedText}
                    </Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center gap-1">
                    <TouchableRipple
                        borderless={true}
                        rippleColor="rgba(236, 72, 153, 0.15)"
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
                        rippleColor="rgba(236, 72, 153, 0.15)"
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
        </View>
    );
};

export default TopHeader;
